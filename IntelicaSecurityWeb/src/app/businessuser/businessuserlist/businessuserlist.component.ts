import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BusinessUserSimpleResponse } from '../dto/businessUserResponses';
import { ProfileService } from '../../profile/profile.service';
import { ProfileSimpleResponses } from '../../profile/dto/profileResponses';
import { BusinessuserService } from '../businessuser.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import { SweetAlertService } from '../../common/services/sweet-alert.service';

@Component({
	selector: 'security-businessuserlist',
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination],
	templateUrl: './businessuserlist.component.html',
	styleUrl: './businessuserlist.component.css'
})
export class BusinessuserlistComponent {
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);

	ProfileID: string | any = null;
	BusinessUserName: string = '';
	BusinessUserEmail: string = '';

	profiles: ProfileSimpleResponses[] = [];
	BusinessUsers: BusinessUserSimpleResponse[] = [];
	BusinessUserFilter: BusinessUserSimpleResponse[] = [];

	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.profileService.GetAll().subscribe((response) => {
			this.profiles = response;
		});

		this.Search();
	}

	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.businessUserService.GetByFilter(this.ProfileID, this.BusinessUserName, this.BusinessUserEmail).subscribe((response) => {
			this.BusinessUsers = response;
			this.Page = 1;
			this.RefreshList();
		});
	}

	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/businessuser/maintenance']);
	}

	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {}

	EditRow(row: BusinessUserSimpleResponse) {
		this.router.navigate(['security/businessuser/maintenance', row.businessUserID]);
	}

	DeleteRow(row: BusinessUserSimpleResponse) {
		this.sweetAlertService.confirmBox('Do you want to delete this business user?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				this.profileService.Delete(row.businessUserID).subscribe({
					next: (response) => {
						if (response.profileID !== '') {
							this.sweetAlertService.messageTextBox(
								`Business User with code <br/> <b> ${row.businessUserID}</b>  <br/> has been successfully deleted.`
							);
							this.Search();
						}
					}
				});
			}
		});
	}

	RefreshList(): void {
		this.BusinessUserFilter = this.BusinessUsers.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
