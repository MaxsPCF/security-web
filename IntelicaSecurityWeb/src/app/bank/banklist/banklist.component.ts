import Swal from "sweetalert2";
import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { BankSimpleResponse } from "../dto/bankResponses";
import { BankService } from "../bank.service";
import { Router } from "@angular/router";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { HtmlToExcel } from "../../common/HtmlToExcel";
import CommonFeatureFlagService from "../../common/services/featureFlagCommon.service";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ConfigService } from "../../common/services/config.service";
import { ActionDirective, ActionsMenuComponent } from "intelica-components-ui";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "security-banklist",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPaginationModule, ActionsMenuComponent, ActionDirective, NgbTooltipModule],
	templateUrl: "./banklist.component.html",
})
export class BanklistComponent implements OnInit {
	private readonly connection: HubConnection;
	private readonly ConfigService = inject(ConfigService);
	private readonly bankService = inject(BankService);
	private readonly router = inject(Router);
	readonly featureFlagService = inject(CommonFeatureFlagService);
	@ViewChild("actionsMenu") actionsMenu!: ActionsMenuComponent;

	BankCode: string = "";
	BankName: string = "";
	BankNameComercial: string = "";
	Page: number = 1;
	PageSize: number = 10;
	Banks: BankSimpleResponse[] = [];
	BanksFilter: BankSimpleResponse[] = [];
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	backBlueClass = false;

	constructor() {
		this.connection = new HubConnectionBuilder().withUrl(`${this.ConfigService.environment?.hubPath}/featureflag`).build();
		this.connection.on("Refresh", () => this.featureFlagService.Refresh());
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
			})
			.then(() => {
				this.connection.invoke("Connect", "Bank");
			});
		this.Search();
	}

	Search(): void {
		this.bankService.GetByFilter(this.BankCode, this.BankName).subscribe(response => {
			this.Banks = response;
			this.Page = 1;
			this.RefreshList();
		});
	}

	Add(): void {
		this.router.navigate(["security/bank/maintenance"]);
	}

	Export(): void {
		if (this.Banks.length == 0) {
			Swal.fire("Information", "There is no information to download.", "info");
			return;
		}
		let body: string = "<tr><th>Bank name</th><th>Country</th><th>Contact Name</th></tr>";
		this.Banks.forEach(row => {
			body += `<tr><td>${row.bankName}</td><td>${row.countryName}</td> <td>${row.contactName}</td> </tr>`;
		});
		this.HtmlToExcel.ExportTOExcel("TableExport", body, `BankList`, "Bank list", "xlsx");
	}

	EditRow(row: BankSimpleResponse): void {
		this.router.navigate(["security/bank/maintenance", row.bankID]);
	}

	ViewDetail(row: BankSimpleResponse): void {
		this.router.navigate(["security/bank/maintenance", true, row.bankID]);
	}

	DeleteRow(row: BankSimpleResponse): void {
		Swal.fire({
			title: "Do you want to delete this bank?",
			showDenyButton: true,
			confirmButtonText: "Si",
			denyButtonText: "No",
		}).then(result => {
			if (result.isConfirmed) {
				this.bankService.Delete(row.bankID).subscribe(response2 => {
					Swal.fire("Information", `Bank with code <br/> <b> ${row.bankID}</b>  <br/> has been successfully deleted`, "success");
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}

	RefreshList(): void {
		this.BanksFilter = this.Banks.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}

	applyFilter() {
		this.actionsMenu.closeAll();
		this.Search();
	}

	ClerSearch() {
		this.BankCode = "";
		this.BankName = "";
		this.BankNameComercial = "";
	}

	exportFilter() {
		this.actionsMenu.closeAll();
		this.Export();
	}

	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}
}
