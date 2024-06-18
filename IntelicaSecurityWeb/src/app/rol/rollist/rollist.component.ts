import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealmRoleSimpleResponse } from '../dto/realmRoleResponses';
import { RealmRoleService } from '../realmRole.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-rollist',
	standalone: true,
	imports: [FormsModule, NgSelectModule],
	templateUrl: './rollist.component.html'
})
export class RollistComponent {
	private readonly realmRoleService = inject(RealmRoleService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmCode: string = '';
	RealmRoleCode: string = '';
	RealmRoleName: string = '';
	realms: Realm[] = [];
	RealmRoles: RealmRoleSimpleResponse[] = [];

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	Search() {
		this.realmRoleService.GetByFilter(this.RealmCode, this.RealmRoleCode, this.RealmRoleName).subscribe((response) => {
			this.RealmRoles = response;
		});
	}
	Add() {
		this.router.navigate(['security/rol/maintenance']);
	}
	Export() {}
	EditRow(row: RealmRoleSimpleResponse) {
		this.router.navigate(['security/rol/maintenance', row.realmRoleCode]);
	}
	DeleteRow(row: RealmRoleSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmRoleService.Delete(row.realmRoleCode).subscribe((response) => {
					Swal.fire('Informacion', `Rol con codigo <br/> <b> ${row.realmRoleCode}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: RealmRoleSimpleResponse) {}
}
