import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealmRoleSimpleResponse } from '../dto/realmRoleResponses';
import { RealmRoleService } from '../realmRole.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-rollist',
	standalone: true,
	imports: [FormsModule, NgSelectModule, NgbPaginationModule],
	templateUrl: './rollist.component.html'
})
export class RollistComponent {
	private readonly realmRoleService = inject(RealmRoleService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmId: string = '';
	RealmRoleId: string = '';
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
	Search() {
		this.realmRoleService.GetByFilter(this.RealmId, this.RealmRoleId, this.RealmRoleName).subscribe((response) => {
			this.RealmRoles = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	Add() {
		this.router.navigate(['security/role/maintenance']);
	}
	Export() {}
	EditRow(row: RealmRoleSimpleResponse) {
		this.router.navigate(['security/role/maintenance', row.realmRoleId]);
	}
	ViewDetail(row: RealmRoleSimpleResponse) {
		this.router.navigate(['security/role/maintenance', true, row.realmRoleId]);
	}
	DeleteRow(row: RealmRoleSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmRoleService.Delete(row.realmRoleId).subscribe((response) => {
					Swal.fire('Informacion', `Rol con codigo <br/> <b> ${row.realmRoleId}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}

	RefreshList(): void {
		this.RealmRolesFilter = this.RealmRoles.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
