import { Component, ViewChild, inject } from '@angular/core';
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
	realms: Realm[] = [];
	clientScopeID: string = '';
	@ViewChild('clientScopeForm', { read: NgForm }) clientScopeForm: any;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
			console.log(this.realms);
		});

		this.clientScopeID = this.activatedRoute.snapshot.params['id'];
		if (this.clientScopeID != undefined && this.clientScopeID != null) {
			this.clientScopeService.Find(this.clientScopeID).subscribe((response) => {
				this.ClientScope = response;
			});
		}
	}
	Back() {
		this.router.navigate(['security/clientscope/list']);
	}
	Submit() {
		if (!this.clientScopeForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.clientScopeID != undefined && this.clientScopeID != null && this.clientScopeID != '') {
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
