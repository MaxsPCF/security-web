import { Component, HostListener, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmSimpleResponse } from '../dto/realmResponses';
import { RealmService } from '../realm.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';
@Component({
	selector: 'security-realmlist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPagination],
	templateUrl: './realmlist.component.html'
})
export class RealmlistComponent {
	RealmName: string = '';
	Realms: RealmSimpleResponse[] = [];
	RealmsFilter: RealmSimpleResponse[] = [];
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.Search();
	}
	Home() {}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.realmService.GetByFilter(this.RealmName).subscribe((response) => {
			this.Realms = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/realm/maintenance']);
	}
	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {
		if (this.Realms.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Realm ID</th><th>Realm name</th></tr>';
		this.Realms.forEach((row) => {
			body += `<tr><td>${row.realmID}</td><td>${row.realmName}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `Realmlist`, 'Realm list', 'xlsx');
	}
	EditRow(row: RealmSimpleResponse) {
		this.router.navigate(['security/realm/maintenance', row.realmID]);
	}
	DeleteRow(row: RealmSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmService.Delete(row.realmID).subscribe((response) => {
					Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${row.realmID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.RealmsFilter = this.Realms.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	ViewDetail(row: RealmSimpleResponse) {
		this.router.navigate(['security/realm/maintenance', true, row.realmID]);
	}
}
