import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealmGroupSimpleResponse } from '../dto/realmGroupResponses';
import { RealmGroupService } from '../realmGroup.service';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'security-gouplist',
	standalone: true,
	imports: [FormsModule, NgSelectModule, NgbPaginationModule],
	templateUrl: './gouplist.component.html'
})
export class GouplistComponent implements OnInit {
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);
	RealmId: string = '';
	RealmGroupId: string = '';
	RealmGroupName: string = '';
	realms: Realm[] = [];
	RealmGroups: RealmGroupSimpleResponse[] = [];
	RealmGroupsFiler: RealmGroupSimpleResponse[] = [];

	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	@HostListener('window:keydown.alt.s', ['$event'])
	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	Home() {}
	Search() {
		this.realmGroupService.GetByFilter(this.RealmId, this.RealmGroupId, this.RealmGroupName).subscribe((response) => {
			this.RealmGroups = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	Add() {
		this.router.navigate(['security/group/maintenance']);
	}
	Export() {
		if (this.RealmGroups.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Group code</th><th>Realm name</th><th>Group name</th></tr>';
		this.RealmGroups.forEach((row) => {
			body += `<tr><td>${row.realmGroupId}</td><td>${row.realmName}</td><td>${row.realmGroupName}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `GroupList`, 'Group list', 'xlsx');
	}
	EditRow(row: RealmGroupSimpleResponse) {
		this.router.navigate(['security/group/maintenance', row.realmGroupId]);
	}
	ViewDetail(row: RealmGroupSimpleResponse) {
		this.router.navigate(['security/group/maintenance', true, row.realmGroupId]);
	}

	DeleteRow(row: RealmGroupSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmGroupService.Delete(row.realmGroupId).subscribe((response) => {
					Swal.fire('Informacion', `Grupo con codigo <br/> <b> ${row.realmGroupId}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.RealmGroupsFiler = this.RealmGroups.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
