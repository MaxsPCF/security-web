import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ProfileService } from '../profile.service';
import { ProfileSimpleResponses } from '../dto/profileResponses';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewDetailsProfileComponent } from '../modals/view-details-profile/view-details-profile.component';
import { ActionDirective, ActionsMenuComponent } from 'intelica-components-ui';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import Swal from 'sweetalert2';
@Component({
	selector: 'security-profilelist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPaginationModule, ActionsMenuComponent, ActionDirective],
	templateUrl: './profilelist.component.html',
	styleUrl: './profilelist.component.css'
})
export class ProfilelistComponent implements OnInit {
	private readonly profileService = inject(ProfileService);
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly modalService = inject(NgbModal);

	profileList: ProfileSimpleResponses[] = [];
	ProfilesFilter: ProfileSimpleResponses[] = [];
	Profiles: ProfileSimpleResponses[] = [];
	nameProfile: string = '';
	descriptionProfile: string = '';
	backBlueClass = false;
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	@ViewChild('actionsMenu') actionsMenu!: ActionsMenuComponent;

	ngOnInit(): void {
		this.Search();
	}
	Add() {
		this.router.navigate(['security/profile/maintenance']);
	}

	EditRow(row: ProfileSimpleResponses) {
		this.router.navigate(['security/profile/maintenance'], {
			queryParams: { profileID: row.profileID }
		});
	}

	DeleteRow(row: ProfileSimpleResponses) {
		this.sweetAlertService.confirmBox('Do you want to delete this profile?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				this.profileService.Delete(row.profileID).subscribe({
					next: (response) => {
						if (response.profileID !== '') {
							this.sweetAlertService.messageTextBox('Process successfully completed.');
							this.Search();
						}
					}
				});
			}
		});
	}
	Search() {
		this.profileService.GetByFilter(this.nameProfile, this.descriptionProfile).subscribe((response) => {
			this.Profiles = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	Export() {
		if (this.Profiles.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Profile name</th><th>Profile description</th></tr>';
		this.Profiles.forEach((row) => {
			body += `<tr><td>${row.profileName}</td><td>${row.profileDescription}</td> </tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `ProfileList`, 'Profile list', 'xlsx');
	}
	viewDetail(row: ProfileSimpleResponses) {
		console.log('row', row);
		const modal = this.modalService.open(ViewDetailsProfileComponent, { size: 'md' });
		modal.componentInstance.listpage = row.profilePages;
	}
	applyFilter() {
		this.actionsMenu.closeAll();
		this.Search();
	}
	ClerSearch() {
		this.nameProfile = '';
		this.descriptionProfile = '';
	}
	exportFilter() {
		this.actionsMenu.closeAll();
		this.Export();
	}
	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}
	RefreshList() {
		this.ProfilesFilter = this.Profiles.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
