import { Component, OnInit, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateDistribution, TemplateDistributionPercentChangeResponse } from "../dto/templateResponses";
import { NgbPaginationModule, NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { TemplateService } from "../template.service";
import { ConfigService } from "../../common/services/config.service";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { CustomKeycloackService } from "../../common/services/keycloakCommon.service";
@Component({
	selector: "security-templatemassivelist",
	standalone: true,
	imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule, NgbProgressbarModule],
	templateUrl: "./templatemassivelist.component.html",
})
export class TemplatemassivelistComponent implements OnInit {
	TemplateDistributionDate: Date = new Date();
	TemplateDistributionOriginFileName: string = "";
	TemplateDistributions: TemplateDistribution[] = [];
	Page: number = 1;
	PageSize: number = 10;
	private readonly TemplateService = inject(TemplateService);
	private readonly ConfigService = inject(ConfigService);
	private readonly connection: HubConnection;
	private readonly customKeycloackService = inject(CustomKeycloackService);
	constructor() {
		this.connection = new HubConnectionBuilder().withUrl(`${this.ConfigService.environment?.hubPath}/template`).build();
		this.connection.on("SendPercentage", message => this.UpdatePercent(message));
		this.connection.on("Connect", message => console.log(message));
	}
	ngOnInit(): void {
		this.connection
			.start()
			.then(_ => {
				console.log("WebSocket Connection Started");
			})
			.catch(error => {
				return console.error(error);
			});
	}
	private UpdatePercent(message: string) {
		let templateDistributionPercentChange: TemplateDistributionPercentChangeResponse = JSON.parse(message);
		let row = this.TemplateDistributions.find(x => x.templateDistributionID == templateDistributionPercentChange.templateDistributionID);
		if (row == undefined) return;
		
		row.templateDistributionDetails.push({ templateDistributionFileName: templateDistributionPercentChange.templateDistributionFileName });
		row.templateDistributionPercent = (row.templateDistributionDetails.length / row.templateDistributionNumberFiles) * 100;
	}
	Search() {
		this.TemplateService.GetDistribution().subscribe(response => {
			this.TemplateDistributions = response;
			if (this.TemplateDistributions.length > 0) this.connection.invoke("Connect", this.customKeycloackService.BusinessUserID);
		});
	}
	RefreshList() {}
}