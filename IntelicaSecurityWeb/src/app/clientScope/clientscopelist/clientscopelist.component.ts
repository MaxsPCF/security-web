import { Component, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Router } from '@angular/router';
import { ClientScopeService } from '../client-scope.service';
import { ClientScope } from '../clientScope';
import { ClientScopeSimpleResponse } from '../dto/clientScopeResponses';
import { FormsModule } from '@angular/forms';
import { Realm } from '../../realm/realm';
import Swal from 'sweetalert2';

@Component({
	selector: 'security-clientscopelist',
	standalone: true,
	imports: [NgSelectModule, FormsModule],
	templateUrl: './clientscopelist.component.html',
	styleUrl: './clientscopelist.component.css'
})
export class ClientscopelistComponent {
	private readonly clientScopeService = inject(ClientScopeService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmID: string = '';
	ClientScopeName: string = '';
	ClientScopeDescription: string = '';
	ClientScopes: ClientScopeSimpleResponse[] = [];
	realms: Realm[] = [];

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	Search() {
		this.clientScopeService.GetByFilter(this.RealmID, this.ClientScopeName, this.ClientScopeDescription).subscribe((response) => {
			this.ClientScopes = response;
		});
	}
	Add() {
		this.router.navigate(['security/clientscope/maintenance']);
	}
	EditRow(row: ClientScopeSimpleResponse) {
		this.router.navigate(['security/clientscope/maintenance', row.clientScopeID]);
	}
	DeleteRow(row: ClientScopeSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.clientScopeService.Delete(row.clientScopeID).subscribe((response) => {
					Swal.fire(
						'Informaci�n',
						`Client scope con codigo <br/> <b> ${row.clientScopeID}</b>  <br/> ha sido eliminado correctamente`,
						'success'
					);
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
}
