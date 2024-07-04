import { Component, HostListener, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Router } from '@angular/router';
import { ClientScopeService } from '../client-scope.service';
import { ClientScope } from '../clientScope';
import { ClientScopeSimpleResponse } from '../dto/clientScopeResponses';
import { FormsModule } from '@angular/forms';
import { Realm } from '../../realm/realm';
import Swal from 'sweetalert2';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-clientscopelist',
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination],
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
	Realms: Realm[] = [];
	ClientScopesFilter: ClientScopeSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.Realms = response;
		});

		this.Search();
	}
	Home() {}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.clientScopeService.GetByFilter(this.RealmID, this.ClientScopeName, this.ClientScopeDescription).subscribe((response) => {
			this.ClientScopes = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/clientscope/maintenance']);
	}
	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {
		if (this.ClientScopes.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Client Scope ID</th><th>Realm Name</th><th>Client Scope Name</th><th>Client Scope Description</th></tr>';
		this.ClientScopes.forEach((row) => {
			body += `<tr><td>${row.clientScopeID}</td><td>${row.realmName}</td><td>${row.clientScopeName}</td><td>${row.clientScopeDescription}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `ClientScopeList`, 'Client Scope list', 'xlsx');
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
	RefreshList(): void {
		this.ClientScopesFilter = this.ClientScopes.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	ViewDetail(row: ClientScopeSimpleResponse) {
		this.router.navigate(['security/clientscope/maintenance', true, row.clientScopeID]);
	}
}
