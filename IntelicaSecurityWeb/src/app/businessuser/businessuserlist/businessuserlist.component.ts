import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealmService } from '../../realm/realm.service';
import { Router } from '@angular/router';
import { Realm } from '../../realm/realm';
import { NgSelectModule } from '@ng-select/ng-select';
import { BusinessUserSimpleResponse } from '../dto/businessUserCommands';
import { ProfileService } from '../../profile/profile.service';
import { ProfileSimpleResponses } from '../../profile/dto/profileResponses';
import { BusinessuserService } from '../businessuser.service';
import Swal from 'sweetalert2';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-businessuserlist',
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination],
	templateUrl: './businessuserlist.component.html',
	styleUrl: './businessuserlist.component.css'
})
export class BusinessuserlistComponent {
	private readonly realmService = inject(RealmService);
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly router = inject(Router);

	RealmID: string = '';
	ProfileID: string = '';
	BusinessUserName: string = '';
	BusinessUserFirstName: string = '';
	BusinessUserLastName: string = '';
	BusinessUserEmail: string = '';
	realms: Realm[] = [];
	profiles: ProfileSimpleResponses[] = [];
	BusinessUsers: BusinessUserSimpleResponse[] = [];
	BusinessUserFilter: BusinessUserSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.profileService.GetAll().subscribe((response) => {
			this.profiles = response;
			console.log(response);
		});

		this.Search();
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.businessUserService
			.GetByFilter(
				this.RealmID,
				this.ProfileID,
				this.BusinessUserName,
				this.BusinessUserFirstName,
				this.BusinessUserLastName,
				this.BusinessUserEmail
			)
			.subscribe((response) => {
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
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.businessUserService.Delete(row.businessUserID).subscribe((response) => {
					Swal.fire(
						'Informaci�n',
						`Business User con codigo <br/> <b> ${row.businessUserID}</b>  <br/> ha sido eliminado correctamente`,
						'success'
					);
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.BusinessUserFilter = this.BusinessUsers.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
