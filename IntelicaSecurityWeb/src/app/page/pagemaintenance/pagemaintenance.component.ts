import { Component, HostListener, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { PageCommand } from "../dto/pageRequests";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
import { PageService } from "../page.service";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "security-pagemaintenance",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbTooltipModule],
	templateUrl: "./pagemaintenance.component.html",
	styleUrl: "./pagemaintenance.component.css",
})
export class PagemaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly pageService = inject(PageService);
	private ngActivatedRoute = inject(ActivatedRoute);

	page: PageCommand = new PageCommand();
	parameters: Params | undefined = undefined;
	pageId: string = "";
	swEdit: Boolean = false;
	Read: Boolean = false;

	@ViewChild("pageForm", { read: NgForm }) pageForm: any;

	ngOnInit(): void {
		this.ngActivatedRoute.queryParams.subscribe(parameters => {
			this.parameters = parameters;
			this.pageId = this.parameters["pageID"];
			if (this.pageId !== "" && this.pageId !== undefined) {
				this.swEdit = true;
				this.GetPage();
			}
		});
	}

	GetPage() {
		this.pageService.Find(this.pageId).subscribe(response => {
			let page = response;
			this.page.pageID = page.pageId;
			this.page.pageName = page.pageName;
			this.page.pageUrl = page.pageUrl;
			this.page.pageIcon = page.pageIcon;
			this.page.pageRoot = page.pageRoot;
			this.page.pageShowMenu = page.pageShowMenu;
		});
	}

	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/page/list"]);
	}

	@HostListener("window:keydown.alt.s", ["$event"])
	Submit() {
		if (!this.pageForm.valid) {
			this.sweetAlertService.messageTextBox("Complete the required fields.");
			return;
		}

		const swError = this.validateCreate(this.page);
		if (swError) {
			this.sweetAlertService.messageTextBox("Please complete all mandatory fields or correct wrong values to continue.");
			return;
		}

		this.sweetAlertService.confirmBox("Are you sure you want to save the changes?", "Yes", "No").then(response => {
			if (response.isConfirmed) {
				if (!this.swEdit) {
					this.pageService.Create(this.page).subscribe({
						next: response => {
							if (response.pageId !== "") {
								this.sweetAlertService.messageTextBox("Process successfully completed.");
							}
						},
						error: error => {},
						complete: () => {},
					});
				} else {
					this.pageService.Update(this.page).subscribe(response => {
						if (response.pageId !== "") {
							this.sweetAlertService.messageTextBox("Process successfully completed.");
						}
					});
				}
			}
		});
	}

	validateCreate(param: PageCommand): boolean {
		let parameter = param;
		let swValidate: boolean = false;
		if (this.swEdit) {
			if (parameter.pageID?.trim() === "") swValidate = true;
		}
		if (parameter.pageName?.trim() === "") {
			this.page.pageName = "";
			swValidate = true;
		}
		if (parameter.pageUrl?.trim() === "") this.page.pageUrl = "";
		if (parameter.pageIcon?.trim() === "") this.page.pageIcon = "";
		if (parameter.pageRoot?.trim() === "") this.page.pageRoot = "";

		return swValidate;
	}

	@HostListener("window:keydown.alt.c", ["$event"])
	Clean() {
		this.page = new PageCommand();
	}
}
