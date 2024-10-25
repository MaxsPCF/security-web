import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BusinessUserSimpleResponse } from "../dto/businessUserResponses";
import { ProfileService } from "../../profile/profile.service";
import { ProfileSimpleResponses } from "../../profile/dto/profileResponses";
import { BusinessuserService } from "../businessuser.service";
import { HtmlToExcel } from "../../common/HtmlToExcel";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
import { MatSelectModule } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ViewDetailsPagesComponent } from "../modals/view-details-pages/view-details-pages.component";
import { ActionDirective, ActionsMenuComponent } from "intelica-components-ui";

@Component({
	selector: "security-businessuserlist",
	standalone: true,
	imports: [FormsModule, MatButtonModule, MatTooltipModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule, ActionsMenuComponent, ActionDirective],
	templateUrl: "./businessuserlist.component.html",
	styleUrl: "./businessuserlist.component.css",
})
export class BusinessuserlistComponent {
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly modalService = inject(NgbModal);

	ProfileID: string | any = null;
	BusinessUserName: string = "";
	BusinessUserEmail: string = "";
	backBlueClass: boolean = false;

	profiles: ProfileSimpleResponses[] = [];
	BusinessUsers: BusinessUserSimpleResponse[] = [];
	BusinessUserFilter: BusinessUserSimpleResponse[] = [];

	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	displayedColumnsUsers: string[] = ["index", "profileName", "businessUserName", "businessUserFirstName", "businessUserLastName", "businessUserEmail", "actions"];
	dataSourceUsers!: MatTableDataSource<BusinessUserSimpleResponse>;

	@ViewChild("matPaginatorUsers") paginatorUsers!: MatPaginator;
	@ViewChild("sortUsers") sortUsers!: MatSort;
	@ViewChild("actionsMenu") actionsMenu!: ActionsMenuComponent;

	ngOnInit() {
		this.profileService.GetAll().subscribe(response => {
			this.profiles = response;
		});

		this.Search();
	}

	Search() {
		this.businessUserService.GetByFilter(this.ProfileID, this.BusinessUserName, this.BusinessUserEmail).subscribe(response => {
			this.BusinessUsers = response;

			this.dataSourceUsers = new MatTableDataSource<BusinessUserSimpleResponse>(this.BusinessUsers);
			this.dataSourceUsers.paginator = this.paginatorUsers;
			this.dataSourceUsers.sort = this.sortUsers;
		});
	}

	Add() {
		this.router.navigate(["security/businessuser/maintenance"]);
	}

	Export() {
		if (this.BusinessUsers.length == 0) {
			this.sweetAlertService.messageTextBox("There is no information to download.");
			return;
		}
		let body: string = "<tr><th>Profile</th><th>Name</th><th>businessUserEmail</th></tr>";
		this.BusinessUsers.forEach(row => {
			body += `<tr><td>${row.profileName}</td><td>${row.businessUserName} ${row.businessUserFirstName} ${row.businessUserLastName}</td>td>${row.businessUserEmail}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel("TableExport", body, `UserList`, "User list", "xlsx");
	}

	EditRow(row: BusinessUserSimpleResponse) {
		this.router.navigate(["security/businessuser/maintenance", row.businessUserID]);
	}

	DeleteRow(row: BusinessUserSimpleResponse) {
		this.sweetAlertService.confirmBox("Do you want to delete this business user?", "Yes", "No").then(response => {
			if (response.isConfirmed) {
				this.profileService.Delete(row.businessUserID).subscribe({
					next: response => {
						if (response.profileID !== "") {
							this.sweetAlertService.messageTextBox(`Business User with code <br/> <b> ${row.businessUserID}</b>  <br/> has been successfully deleted.`);
							this.Search();
						}
					},
				});
			}
		});
	}

	viewDetailPage(row: BusinessUserSimpleResponse) {
		const modal = this.modalService.open(ViewDetailsPagesComponent, { size: "xl", backdrop: "static" });
		modal.componentInstance.businessUserID = row.businessUserID;
	}

	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}

	applyFilter() {
		this.actionsMenu.closeAll();
		this.Search();
	}

	ClerSearch() {
		this.ProfileID = null;
		this.BusinessUserName = "";
		this.BusinessUserEmail = "";
	}
}
