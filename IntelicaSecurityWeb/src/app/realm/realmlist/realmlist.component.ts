import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmSimpleResponse } from '../dto/realmResponses';
import { RealmService } from '../realm.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
	selector: 'security-realmlist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './realmlist.component.html'
})
export class RealmlistComponent {
	RealmName: string = '';
	RealmCode: string = '';
	Realms: RealmSimpleResponse[] = [];
	selectedCar: number=1;
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	ngOnInit() {
		this.Search();
	}
	Home() {}
	Search() {
		this.realmService.GetByFilter(this.RealmName).subscribe((response) => {
			this.Realms = response;
		});
	}
	Add() {
		this.router.navigate(['security/realm/maintenance']);
	}
	Export() {}
	EditRow(row: RealmSimpleResponse) {
		this.router.navigate(['security/realm/maintenance', row.realmCode]);
	}
	DeleteRow(row: RealmSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmService.Delete(row.realmCode).subscribe((response) => {
					Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${row.realmCode}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: RealmSimpleResponse) {}
}
