import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ProfileService } from '../profile.service';
import { ProfileCommand } from '../dto/profileRequests';

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
	private ngActivatedRoute = inject(ActivatedRoute);

	profile: ProfileCommand = new ProfileCommand();
	parameters: Params | undefined = undefined;
	profileId: string = '';
	swEdit: Boolean = false;

	ngOnInit(): void {
		this.ngActivatedRoute.queryParams.subscribe((parameters) => {
			this.parameters = parameters;
			this.profileId = this.parameters['profileID'];
			if (this.profileId !== '' && this.profileId !== undefined) {
				this.swEdit = true;
				this.GetProfile();
			}
		});
	}

	GetProfile() {
		this.profileService.Find(this.profileId).subscribe((response) => {
			let profile = response;
			this.profile.profileID = profile.profileID;
			this.profile.profileName = profile.profileName;
			this.profile.profileDescription = profile.profileDescription;
		});
	}

	Home() {}

	Back() {
		this.router.navigate(['security/profile/list']);
	}

	Submit() {
		const swError = this.validateCreate(this.profile);
		if (swError) {
			this.sweetAlertService.messageTextBox('Please complete all mandatory fields or correct wrong values to continue.');
			return;
		}

		this.sweetAlertService.confirmBox('Are you sure you want to save the changes?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				if (!this.swEdit) {
					this.profileService.Create(this.profile).subscribe({
						next: (response) => {
							if (response.profileID !== '') {
								this.sweetAlertService.messageTextBox('Process successfully completed.');
							}
						},
						error: (error) => {},
						complete: () => {}
					});
				} else {
					this.profileService.Update(this.profile).subscribe((response) => {
						if (response.profileID !== '') {
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
