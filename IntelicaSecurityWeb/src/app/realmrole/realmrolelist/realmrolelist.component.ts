import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { RealmRoleSimpleResponse } from '../dto/realmRoleResponses';
import { RealmRoleService } from '../realmRole.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-realmrolelist',
	standalone: true,
	imports: [FormsModule, NgSelectModule, NgbPagination],
	templateUrl: './realmrolelist.component.html',
	styleUrl: './realmrolelist.component.css'
})
export class RealmrolelistComponent {
	private readonly realmRoleService = inject(RealmRoleService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmID: string = '';
	RealmRoleID: string = '';
	RealmRoleName: string = '';
	realms: Realm[] = [];
	RealmRoles: RealmRoleSimpleResponse[] = [];
	RealmRolesFilter: RealmRoleSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.realmRoleService.GetByFilter(this.RealmID, this.RealmRoleID, this.RealmRoleName).subscribe((response) => {
			this.RealmRoles = response;
			console.log(this.RealmRoles);
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/realmrole/maintenance']);
	}
	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {
		if (this.RealmRoles.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Realm Role ID</th><th>Realm name</th><th>Realm Role Name</th><th>Realm Role Description</th></tr>';
		this.RealmRoles.forEach((row) => {
			body += `<tr><td>${row.realmRoleID}</td><td>${row.realmName}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `Realmlist`, 'Realm list', 'xlsx');
	}
	EditRow(row: RealmRoleSimpleResponse) {
		this.router.navigate(['security/realmrole/maintenance', row.realmRoleID]);
	}
	DeleteRow(row: RealmRoleSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmRoleService.Delete(row.realmRoleID).subscribe((response) => {
					Swal.fire('Informacion', `Rol con codigo <br/> <b> ${row.realmRoleID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: RealmRoleSimpleResponse) {}
	RefreshList() {
		this.RealmRolesFilter = this.RealmRoles.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
