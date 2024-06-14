import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../client';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ClientService } from '../client.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Realm } from '../../realm/realm';

@Component({
	selector: 'security-clientmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './clientmaintenance.component.html',
	styleUrl: './clientmaintenance.component.css'
})
export class ClientmaintenanceComponent {
	private readonly router = inject(Router);
	private readonly clientService = inject(ClientService);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);

	Client: Client = new Client();
	realms: Realm[] = [];
	clientCode: string = '';
	@ViewChild('clientForm', { read: NgForm }) clientForm: any;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
			console.log(this.realms);
		});

		this.clientCode = this.activatedRoute.snapshot.params['id'];
		if (this.clientCode != undefined && this.clientCode != null) {
			this.clientService.Find(this.clientCode).subscribe((response) => {
				this.Client = response;
				console.log(response);
			});
		}
	}
	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/client/list']);
	}
	Submit() {
		console.log(this.clientForm.valid);
		if (!this.clientForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.clientCode != undefined && this.clientCode != null && this.clientCode != '') {
			this.clientService.Update(this.Client).subscribe((response) => {
				Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${response.clientCode}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.clientService.Create(this.Client).subscribe((response) => {
				Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${response.clientCode}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.Client = new Client();
	}
}
