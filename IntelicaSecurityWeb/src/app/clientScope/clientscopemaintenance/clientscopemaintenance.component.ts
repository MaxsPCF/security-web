import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientScope } from '../clientScope';
import { Realm } from '../../realm/realm';
import { ClientScopeService } from '../client-scope.service';
import Swal from 'sweetalert2';
import { RealmService } from '../../realm/realm.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'security-clientscopemaintenance',
	standalone: true,
	imports: [NgSelectModule, FormsModule],
	templateUrl: './clientscopemaintenance.component.html',
	styleUrl: './clientscopemaintenance.component.css'
})
export class ClientscopemaintenanceComponent {
	private readonly router = inject(Router);
	private readonly clientScopeService = inject(ClientScopeService);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);

	ClientScope: ClientScope = new ClientScope();
	Realms: Realm[] = [];
	ClientScopeID: string = '';
	@ViewChild('ClientScopeForm', { read: NgForm }) ClientScopeForm: any;
	Read: boolean = false;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.Realms = response;
			console.log(response);
		});

		this.ClientScopeID = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		if (this.ClientScopeID != undefined && this.ClientScopeID != null) {
			this.clientScopeService.Find(this.ClientScopeID).subscribe((response) => {
				this.ClientScope = response;
			});
		}
		if (this.ClientScopeID == undefined && this.ClientScopeID == null) this.Read = false;
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/clientscope/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		console.log(this.ClientScope);
		if (!this.ClientScopeForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.ClientScopeID != undefined && this.ClientScopeID != null && this.ClientScopeID != '') {
			this.clientScopeService.Update(this.ClientScope).subscribe((response) => {
				Swal.fire(
					'Informaci�n',
					`Cliente scope con codigo <br/> <b> ${response.clientScopeID}</b>  <br/> ha sido actualizado correctamente`,
					'success'
				);
				this.Back();
				this.Clean();
			});
		} else {
			this.clientScopeService.Create(this.ClientScope).subscribe((response) => {
				Swal.fire(
					'Informaci�n',
					`Cliente scope con codigo <br/> <b> ${response.clientScopeID}</b>  <br/> ha sido registrada correctamente`,
					'success'
				);
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.ClientScope = new ClientScope();
	}
}
