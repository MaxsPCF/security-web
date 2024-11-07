import { Component, HostListener, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
import { ProfileService } from "../profile.service";
import { ProfileCommand, ProfilePageCommand } from "../dto/profileRequests";
import { PageService } from "../../page/page.service";
import { PageSimpleResponse } from "../../page/dto/pageResponses";
import { PageProfile, Profile } from "../dto/pageProfile";
import { forkJoin } from "rxjs";
import { ProfileSimpleResponses } from "../dto/profileResponses";
import { Guid } from "guid-typescript";
import { NgbPaginationModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "security-profilemaintenance",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbTooltipModule, NgbPaginationModule],
	templateUrl: "./profilemaintenance.component.html",
	styleUrl: "./profilemaintenance.component.css",
})
export class ProfilemaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly profileService = inject(ProfileService);
	private readonly pageService = inject(PageService);
	private readonly ngActivatedRoute = inject(ActivatedRoute);

	currentProfile: ProfileCommand = new ProfileCommand();
	parameters: Params | undefined = undefined;
	profileId: string = "";
	swEdit: Boolean = false;

	pageListAll: PageSimpleResponse[] = [];
	PageProfileList: PageProfile[] = [];

	profileByID: ProfileSimpleResponses = {} as ProfileSimpleResponses;
	profileTemp: Profile = new Profile();
	Read: boolean = false;
	Page: number = 1;
	PageSize: number = 10;

	indeterminate: boolean = false;
	checked: boolean = false;

	@ViewChild("profileForm", { read: NgForm }) profileForm: any;

	ngOnInit(): void {
		this.ngActivatedRoute.queryParams.subscribe(parameters => {
			this.parameters = parameters;
			this.profileId = this.parameters["profileID"];
			if (this.profileId !== "" && this.profileId !== undefined) {
				this.swEdit = true;
				this.getProfile();
			} else {
				this.getAll();
			}
		});
	}

	getAll() {
		this.pageService.GetAll().subscribe(response => {
			this.pageListAll = response;
			this.profileTemp.profilePages = [];

			this.pageListAll.forEach(itemPage => {
				this.profileTemp.profilePages.push({
					pageId: itemPage.pageId,
					pageName: itemPage.pageName,
					profilePageCanUpdate: true,
					profilePageCanCreate: true,
					profilePageCanDelete: true,
					isSelect: false,
				});
			});

			this.Page = 1;
			this.RefreshList();

			this.checkHeader();
		});
	}

	getProfile() {
		const getAllServicesSF = forkJoin({
			pageAll: this.pageService.GetAll(),
			profile: this.profileService.GetById(this.profileId),
		});
		getAllServicesSF.subscribe({
			next: response => {
				this.pageListAll = response.pageAll;
				this.profileByID = response.profile;

				this.profileTemp.profileID = this.profileByID.profileID;
				this.profileTemp.profileName = this.profileByID.profileName;
				this.profileTemp.profileDescription = this.profileByID.profileDescription;
				this.profileTemp.profilePages = [];

				this.pageListAll.forEach(itemPage => {
					let _page = this.profileByID.profilePages.find(f => f.pageID === itemPage.pageId);
					if (_page !== undefined) {
						this.profileTemp.profilePages.push({
							pageId: itemPage.pageId,
							pageName: itemPage.pageName,
							profilePageCanUpdate: _page.profilePageCanUpdate,
							profilePageCanCreate: _page.profilePageCanCreate,
							profilePageCanDelete: _page.profilePageCanDelete,
							isSelect: true,
						});
					} else {
						this.profileTemp.profilePages.push({
							pageId: itemPage.pageId,
							pageName: itemPage.pageName,
							profilePageCanUpdate: true,
							profilePageCanCreate: true,
							profilePageCanDelete: true,
							isSelect: false,
						});
					}
				});

				this.Page = 1;
				this.RefreshList();
			},
			error: error => {},
			complete: () => {
				this.checkHeader();
			},
		});
	}

	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/profile/list"]);
	}

	@HostListener("window:keydown.alt.s", ["$event"])
	Submit() {
		if (!this.profileForm.valid) {
			this.sweetAlertService.messageTextBox("Complete the required fields.");
			return;
		}

		this.sweetAlertService.confirmBox("Do you want the changes to be updated for all users?", "Yes", "No").then(response => {
			if (response.isConfirmed) {
			}
		});

		this.currentProfile.profileID = this.swEdit ? this.profileId : Guid.EMPTY;
		this.currentProfile.profileName = this.profileTemp.profileName;
		this.currentProfile.profileDescription = this.profileTemp.profileDescription;
		this.currentProfile.profilePages = [];
		this.profileTemp.profilePages.forEach(itemPage => {
			if (itemPage.isSelect) {
				let rowSelect: ProfilePageCommand = new ProfilePageCommand();
				rowSelect.profileID = this.currentProfile.profileID;
				rowSelect.pageID = itemPage.pageId;
				if (this.swEdit && this.profileByID.profilePages?.length > 0) {
					let _page = this.profileByID.profilePages.find(f => f.pageID === itemPage.pageId);
					if (_page !== undefined) rowSelect.profilePageID = _page.profilePageID;
				}
				rowSelect.profilePageCanCreate = itemPage.profilePageCanCreate;
				rowSelect.profilePageCanUpdate = itemPage.profilePageCanUpdate;
				rowSelect.profilePageCanDelete = itemPage.profilePageCanDelete;
				this.currentProfile.profilePages.push(rowSelect);
			}
		});

		const swError = this.validateCreate(this.currentProfile);
		if (swError) {
			this.sweetAlertService.messageTextBox("Please complete all mandatory fields or correct wrong values to continue.");
			return;
		}

		let msgConfirm: string = "Are you sure you want to save the changes?";
		if (this.swEdit) msgConfirm = "The changes will be updated for all users who have the profile, you want to save the changes?";

		// console.log('this.currentProfile', this.currentProfile);
		this.sweetAlertService.confirmBox(msgConfirm, "Yes", "No").then(response => {
			if (response.isConfirmed) {
				if (!this.swEdit) {
					this.profileService.Create(this.currentProfile).subscribe({
						next: response => {
							if (response.profileID !== "") {
								this.profileId = response.profileID;
								this.getProfile();
								this.sweetAlertService.messageTextBox("The process was successfully updated.");
							}
						},
						error: error => {},
						complete: () => {},
					});
				} else {
					this.profileService.Update(this.currentProfile).subscribe(response => {
						if (response.profileID !== "") {
							this.profileId = response.profileID;
							this.getProfile();
							this.sweetAlertService.messageTextBox("The process was successfully saved.");
						}
					});
				}
			}
		});
	}

	validateCreate(param: ProfileCommand): boolean {
		let parameter = param;
		let swValidate: boolean = false;
		if (this.swEdit) {
			if (parameter.profileID?.trim() === "") swValidate = true;
		}
		if (parameter.profileName?.trim() === "") {
			this.profileTemp.profileName = "";
			swValidate = true;
		}
		if (parameter.profilePages.length === 0) swValidate = true;

		return swValidate;
	}

	@HostListener("window:keydown.alt.c", ["$event"])
	Clean() {
		this.profileTemp = new Profile();
		if (this.profileId !== "" && this.profileId !== undefined) {
			this.swEdit = true;
			this.getProfile();
		} else {
			this.getAll();
		}
	}

	RefreshList() {
		this.PageProfileList = this.profileTemp.profilePages.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}

	onSelectAllChange(event: any) {
		const checked = event.target.checked;
		this.profileTemp.profilePages.forEach(item => (item.isSelect = checked));

		this.checkHeader();
	}

	checkHeader() {
		if ([...this.profileTemp.profilePages].filter(f => f.isSelect === false).length === this.profileTemp.profilePages.length) {
			this.indeterminate = false;
			this.checked = false;
		}
		if (
			[...this.profileTemp.profilePages].filter(f => f.isSelect === true).length > 0 &&
			[...this.profileTemp.profilePages].filter(f => f.isSelect === true).length < this.profileTemp.profilePages.length
		) {
			this.indeterminate = true;
			this.checked = false;
		}
		if ([...this.profileTemp.profilePages].filter(f => f.isSelect === true).length === this.profileTemp.profilePages.length) {
			this.indeterminate = false;
			this.checked = true;
		}
	}
}
