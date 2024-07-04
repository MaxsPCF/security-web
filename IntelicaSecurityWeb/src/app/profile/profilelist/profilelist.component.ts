import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ProfileService } from '../profile.service';
import { ProfileSimpleResponses } from '../dto/profileResponses';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewDetailsProfileComponent } from '../modals/view-details-profile/view-details-profile.component';
@Component({
	selector: 'security-profilelist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './profilelist.component.html',
	styleUrl: './profilelist.component.css'
})
export class ProfilelistComponent implements OnInit {
	private readonly profileService = inject(ProfileService);
	private readonly router = inject(Router);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly modalService = inject(NgbModal);
	profileList: ProfileSimpleResponses[] = [];
	ngOnInit(): void {
		this.GetAll();
	}
	GetAll() {
		this.profileService.GetAll().subscribe((response) => {
			this.profileList = response;
		});
	}
	Add() {
		this.router.navigate(['security/profile/maintenance']);
	}
	Export() {}
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
							this.GetAll();
						}
					}
				});
			}
		});
	}
	viewDetail(row: ProfileSimpleResponses) {
		const modal = this.modalService.open(ViewDetailsProfileComponent, { size: 'xl' });
		modal.componentInstance.listpage = row.profilePages;
	}
}