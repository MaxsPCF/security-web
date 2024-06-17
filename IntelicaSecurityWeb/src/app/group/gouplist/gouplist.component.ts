import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealmGroupSimpleResponse } from '../dto/realmGroupResponses';
import { RealmGroupService } from '../realmGroup.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-gouplist',
	standalone: true,
	imports: [FormsModule, NgSelectModule],
	templateUrl: './gouplist.component.html'
})
export class GouplistComponent implements OnInit {
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmCode: string = '';
	RealmGroupCode: string = '';
	RealmGroupName: string = '';
	realms: Realm[] = [];
	RealmGroups: RealmGroupSimpleResponse[] = [];

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	Search() {
		this.realmGroupService.GetByFilter(this.RealmCode, this.RealmGroupCode, this.RealmGroupName).subscribe((response) => {
			this.RealmGroups = response;
		});
	}
	Add() {
		this.router.navigate(['security/group/maintenance']);
	}
	Export() {}
	EditRow(row: RealmGroupSimpleResponse) {
		this.router.navigate(['security/group/maintenance', row.realmGroupCode]);
	}
	DeleteRow(row: RealmGroupSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmGroupService.Delete(row.realmGroupCode).subscribe((response) => {
					Swal.fire('Informacion', `Groupo con codigo <br/> <b> ${row.realmGroupCode}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: RealmGroupSimpleResponse) {}
}
