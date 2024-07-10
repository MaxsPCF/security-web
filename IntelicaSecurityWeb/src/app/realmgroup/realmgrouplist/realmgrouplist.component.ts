import { Component, HostListener, inject } from '@angular/core';
import { RealmGroupService } from '../realmGroup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { RealmGroupSimpleResponse } from '../dto/realmGroupResponses';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';

@Component({
	selector: 'security-realmgrouplist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPagination],
	templateUrl: './realmgrouplist.component.html',
	styleUrl: './realmgrouplist.component.css'
})
export class RealmgrouplistComponent {
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);
	RealmID: string = '';
	RealmGroupID: string = '';
	RealmGroupName: string = '';
	realms: Realm[] = [];
	RealmGroups: RealmGroupSimpleResponse[] = [];
	RealmGroupsFilter: RealmGroupSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Search();
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.realmGroupService.GetByFilter(this.RealmID, this.RealmGroupID, this.RealmGroupName).subscribe((response) => {
			this.RealmGroups = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener('window:keydown.alt.a', ['$event'])
	Add() {
		this.router.navigate(['security/realmgroup/maintenance']);
	}
	@HostListener('window:keydown.alt.q', ['$event'])
	Export() {}
	EditRow(row: RealmGroupSimpleResponse) {
		this.router.navigate(['security/realmgroup/maintenance', row.realmGroupID]);
	}
	DeleteRow(row: RealmGroupSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmGroupService.Delete(row.realmGroupID).subscribe((response) => {
					Swal.fire('Informacion', `Grupo con codigo <br/> <b> ${row.realmGroupID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.RealmGroupsFilter = this.RealmGroups.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
