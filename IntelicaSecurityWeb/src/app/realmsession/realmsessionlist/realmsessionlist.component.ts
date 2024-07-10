import { Component, HostListener, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Realm } from '../../realm/realm';
import { RealmsessionService } from '../realmsession.service';
import { RealmService } from '../../realm/realm.service';
import Swal from 'sweetalert2';
import { RealmSessionSimpleResponse } from '../dto/realmResponses';

@Component({
	selector: 'security-realmsessionlist',
	standalone: true,
	imports: [NgbPagination, NgSelectModule, FormsModule, ReactiveFormsModule],
	templateUrl: './realmsessionlist.component.html',
	styleUrl: './realmsessionlist.component.css'
})
export class RealmsessionlistComponent {
	private readonly realmSessionService = inject(RealmsessionService);
	private readonly realmService = inject(RealmService);
	RealmID: string = '';
	Realms: Realm[] = [];
	RealmSession: RealmSessionSimpleResponse[] = [];
	RealmSessionFilter: RealmSessionSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;

	ngOnInit() {
		this.realmService.GetAll().subscribe((response) => {
			this.Realms = response;
		});

		this.Search();
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Search() {
		this.realmSessionService.GetByFilter(this.RealmID).subscribe((response) => {
			this.RealmSession = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	RefreshList() {
		this.RealmSessionFilter = this.RealmSession.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	DeleteRow(row: RealmSessionSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea cerrar la sesión de este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.realmSessionService.SignOut(row.id, row.realmID).subscribe((response) => {
					Swal.fire('Informaci�n', `Sesión con codigo <br/> <b> ${row.id}</b>  <br/> ha sido cerrada correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
}
