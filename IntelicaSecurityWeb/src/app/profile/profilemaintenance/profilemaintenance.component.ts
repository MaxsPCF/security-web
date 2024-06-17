import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ProfileService } from '../profile.service';
import { ProfileCommand, ProfilePageCommand } from '../dto/profileRequests';
import { PageService } from '../../page/page.service';
import { PageSimpleResponse } from '../../page/dto/pageResponses';
import { PageProfile } from '../dto/pageProfile';
import { forkJoin } from 'rxjs';
import { ProfileSimpleResponses } from '../dto/profileResponses';

@Component({
	selector: 'security-profilemaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './profilemaintenance.component.html',
	styleUrl: './profilemaintenance.component.css'
})
export class ProfilemaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly profileService = inject(ProfileService);
	private readonly pageService = inject(PageService);
	private ngActivatedRoute = inject(ActivatedRoute);

	currentProfile: ProfileCommand = new ProfileCommand();
	parameters: Params | undefined = undefined;
	profileId: string = '';
	swEdit: Boolean = false;

	pageListAll: PageSimpleResponse[] = [];
	listPageProfile: PageProfile[] = [];
	profile: ProfileSimpleResponses = {} as ProfileSimpleResponses;

	ngOnInit(): void {
		this.ngActivatedRoute.queryParams.subscribe((parameters) => {
			this.parameters = parameters;
			this.profileId = this.parameters['profileID'];
			if (this.profileId !== '' && this.profileId !== undefined) {
				this.swEdit = true;
				this.GetProfile();
			} else {
				this.GetAll();
			}
		});
	}

	GetAll() {
		this.pageService.GetAll().subscribe((response) => {
			this.pageListAll = response;

			this.pageListAll.forEach((itemPage) => {
				this.listPageProfile.push({ pageId: itemPage.pageId, pageName: itemPage.pageName, pageUrl: itemPage.pageUrl, isSelect: false });
			});
		});
	}

	GetProfile() {
		const getAllServicesSF = forkJoin({
			pageAll: this.pageService.GetAll(),
			profile: this.profileService.Find(this.profileId)
		});
		getAllServicesSF.subscribe({
			next: (response) => {
				this.pageListAll = response.pageAll;
				this.profile = response.profile;

				this.currentProfile.profileID = this.profile.profileID;
				this.currentProfile.profileName = this.profile.profileName;
				this.currentProfile.profileDescription = this.profile.profileDescription;

				this.listPageProfile = [];

				if (this.profile.profilePages.length > 0) {
					this.pageListAll.forEach((itemPage) => {
						let _page = this.profile.profilePages.find((f) => f.pageID === itemPage.pageId);
						let swSelect: boolean = _page !== undefined;
						this.listPageProfile.push({ pageId: itemPage.pageId, pageName: itemPage.pageName, pageUrl: itemPage.pageUrl, isSelect: swSelect });
					});
				} else {
					this.pageListAll.forEach((itemPage) => {
						this.listPageProfile.push({ pageId: itemPage.pageId, pageName: itemPage.pageName, pageUrl: itemPage.pageUrl, isSelect: false });
					});
				}
			},
			error: (error) => {},
			complete: () => {}
		});
	}

	Home() {}

	Back() {
		this.router.navigate(['security/profile/list']);
	}

	Submit() {
		const swError = this.validateCreate(this.currentProfile);
		if (swError) {
			this.sweetAlertService.messageTextBox('Please complete all mandatory fields or correct wrong values to continue.');
			return;
		}

		this.currentProfile.profilePages = [];
		this.listPageProfile.forEach((itemPage) => {
			if (itemPage.isSelect) {
				let rowSelect: ProfilePageCommand = new ProfilePageCommand();
				rowSelect.profileID = this.currentProfile.profileID;
				rowSelect.pageID = itemPage.pageId;

				if (this.profile.profilePages?.length > 0) {
					let _page = this.profile.profilePages.find((f) => f.pageID === itemPage.pageId);
					if (_page !== undefined) rowSelect.profilePageID = _page.profilePageID;
				}

				this.currentProfile.profilePages.push(rowSelect);
			}
		});

		// console.log('this.currentProfile', this.currentProfile);

		this.sweetAlertService.confirmBox('Are you sure you want to save the changes?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				if (!this.swEdit) {
					this.profileService.Create(this.currentProfile).subscribe({
						next: (response) => {
							if (response.profileID !== '') {
								this.profileId = response.profileID;
								this.GetProfile();
								this.sweetAlertService.messageTextBox('Process successfully completed.');
							}
						},
						error: (error) => {},
						complete: () => {}
					});
				} else {
					this.profileService.Update(this.currentProfile).subscribe((response) => {
						if (response.profileID !== '') {
							this.profileId = response.profileID;
							this.GetProfile();
							this.sweetAlertService.messageTextBox('Process successfully completed.');
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
			if (parameter.profileID?.trim() === '') swValidate = true;
		}
		if (parameter.profileName?.trim() === '') swValidate = true;
		if (parameter.profileDescription?.trim() === '') swValidate = true;

		return swValidate;
	}
}
