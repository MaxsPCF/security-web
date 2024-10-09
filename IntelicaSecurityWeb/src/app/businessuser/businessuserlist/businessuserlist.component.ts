import { Component, HostListener, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
// import { NgSelectModule } from '@ng-select/ng-select';
import { BusinessUserSimpleResponse } from "../dto/businessUserResponses";
import { ProfileService } from "../../profile/profile.service";
import { ProfileSimpleResponses } from "../../profile/dto/profileResponses";
import { BusinessuserService } from "../businessuser.service";
// import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
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

@Component({
	selector: "security-businessuserlist",
	standalone: true,
	imports: [
		// NgSelectModule,
		FormsModule,
		// NgbPagination,
		MatButtonModule,
		MatTooltipModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
	],
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

	profiles: ProfileSimpleResponses[] = [];
	BusinessUsers: BusinessUserSimpleResponse[] = [];
	BusinessUserFilter: BusinessUserSimpleResponse[] = [];

	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	@ViewChild("matPaginatorUsers") paginatorUsers: any = MatPaginator;
	@ViewChild("sortUsers") sortUsers = new MatSort();

	displayedColumnsUsers: string[] = ["index", "profileName", "UserName", "FirstName", "LastName", "UserEmail", "Actions"];
	dataSourceUsers!: MatTableDataSource<BusinessUserSimpleResponse>;

	ngOnInit() {
		this.profileService.GetAll().subscribe(response => {
			this.profiles = response;
		});

		this.Search();
	}

	@HostListener("window:keydown.alt.s", ["$event"])
	Search() {
		this.businessUserService.GetByFilter(this.ProfileID, this.BusinessUserName, this.BusinessUserEmail).subscribe(response => {
			this.BusinessUsers = response;
			// this.Page = 1;
			// this.RefreshList();

			this.dataSourceUsers = new MatTableDataSource(this.BusinessUsers);
			this.dataSourceUsers.paginator = this.paginatorUsers;
			this.dataSourceUsers.sort = this.sortUsers;
		});
	}

	@HostListener("window:keydown.alt.a", ["$event"])
	Add() {
		this.router.navigate(["security/businessuser/maintenance"]);
	}

	@HostListener("window:keydown.alt.q", ["$event"])
	Export() {}

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
		console.log("row.businessUserID", row.businessUserID);
		const modal = this.modalService.open(ViewDetailsPagesComponent, { size: "xl", backdrop: false });
		modal.componentInstance.businessUserID = row.businessUserID;
	}

	// RefreshList(): void {
	// 	this.BusinessUserFilter = this.BusinessUsers.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	// }
}
