import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientSimpleResponse } from '../dto/clientResponses';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-clientlist',
	standalone: true,
	imports: [FormsModule, NgSelectModule],
	templateUrl: './clientlist.component.html',
	styleUrl: './clientlist.component.css'
})
export class ClientlistComponent {
	private readonly clientService = inject(ClientService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmCode: string = '';
	ClientId: string = '';
	ClientName: string = '';
	realms: Realm[] = [];
	Clients: ClientSimpleResponse[] = [];

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	Search() {
		this.clientService.GetByFilter(this.RealmCode, this.ClientId, this.ClientName).subscribe((response) => {
			this.Clients = response;
		});
	}
	Add() {
		this.router.navigate(['security/client/maintenance']);
	}
	Export() {}
	EditRow(row: ClientSimpleResponse) {
		this.router.navigate(['security/client/maintenance', row.clientCode]);
	}
	DeleteRow(row: ClientSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.clientService.Delete(row.clientCode).subscribe((response) => {
					Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${row.clientCode}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: ClientSimpleResponse) {}
}
