import { Component, HostListener, ViewChild, inject } from '@angular/core';
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
	ClientID: string = '';
	@ViewChild('ClientForm', { read: NgForm }) ClientForm: any;
	Read: boolean = false;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});

		this.Read = this.activatedRoute.snapshot.params['read'];
		this.ClientID = this.activatedRoute.snapshot.params['id'];
		if (this.ClientID != undefined && this.ClientID != null) {
			this.clientService.Find(this.ClientID).subscribe((response) => {
				this.Client = response;
			});
		}
		if (this.ClientID == undefined && this.ClientID == null) this.Read = false;
		console.log(this.Read);
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/client/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		console.log(this.ClientForm.valid);
		if (!this.ClientForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.ClientID != undefined && this.ClientID != null && this.ClientID != '') {
			this.clientService.Update(this.Client).subscribe((response) => {
				Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${response.clientID}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.clientService.Create(this.Client).subscribe((response) => {
				Swal.fire('Informaci�n', `Cliente con codigo <br/> <b> ${response.clientID}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.Client = new Client();
	}
}
