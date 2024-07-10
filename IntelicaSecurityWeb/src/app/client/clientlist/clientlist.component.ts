import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientSimpleResponse } from '../dto/clientResponses';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-clientlist',
	standalone: true,
	imports: [FormsModule, NgSelectModule, NgbPagination],
	templateUrl: './clientlist.component.html',
	styleUrl: './clientlist.component.css'
})
export class ClientlistComponent {
	private readonly clientService = inject(ClientService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	RealmID: string = '';
	ClientID: string = '';
	ClientName: string = '';
	realms: Realm[] = [];
	Clients: ClientSimpleResponse[] = [];
	ClientsFilter: ClientSimpleResponse[] = [];
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
		this.clientService.GetByFilter(this.ClientID, this.RealmID, this.ClientName).subscribe((response) => {
			this.Clients = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/client/maintenance']);
	}
	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {
		if (this.Clients.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Client ID</th><th>Realm name</th><th>Client Name</th><th>Client Description</th></tr>';
		this.Clients.forEach((row) => {
			body += `<tr><td>${row.clientID}</td><td>${row.realmName}</td><td>${row.clientName}</td><td>${row.clientDescription}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `ClientList`, 'Client list', 'xlsx');
	}
	EditRow(row: ClientSimpleResponse) {
		this.router.navigate(['security/client/maintenance', row.clientID]);
	}
	DeleteRow(row: ClientSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.clientService.Delete(row.clientID).subscribe((response) => {
					Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${row.clientID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.ClientsFilter = this.Clients.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	ViewDetail(row: ClientSimpleResponse) {
		this.router.navigate(['security/client/maintenance', true, row.clientID]);
	}
}
