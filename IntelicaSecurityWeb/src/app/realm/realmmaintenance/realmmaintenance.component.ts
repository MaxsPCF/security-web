import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Realm } from '../realm';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RealmService } from '../realm.service';
import { CustomKeycloackService } from '../../common/services/keycloakCommon.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Component({
	selector: 'security-realmmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './realmmaintenance.component.html'
})
export class RealmmaintenanceComponent {
	private readonly router = inject(Router);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);
	private readonly connection: HubConnection;
	private readonly customKeycloackService = inject(CustomKeycloackService);

	Realm: Realm = new Realm();
	RealmID: string = '';
	@ViewChild('RealmForm', { read: NgForm }) RealmForm: any;
	Read: boolean = false;
	constructor() {
		this.connection = new HubConnectionBuilder().withUrl(`http://localhost:5149/hubs/notification`).build();
		this.connection.on("SendNotification", message => Swal.fire('Informaci�n', message, 'success'));
		this.connection.on("Connect", message => console.log(message));
	}
	ngOnInit() {
		this.connection
			.start()
			.then(_ => {
				console.log("WebSocket Connection Started");
			})
			.catch(error => {
				return console.error(error);
			});

		this.RealmID = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		if (this.RealmID != undefined && this.RealmID != null) {
			this.realmService.Find(this.RealmID).subscribe((response) => {
				this.Realm = response;
			});
		}
		if (this.RealmID == undefined && this.RealmID == null) this.Read = false;
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/realm/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		if (!this.RealmForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.RealmID != undefined && this.RealmID != null && this.RealmID != '') {
			this.realmService.Update(this.Realm).subscribe((response) => {
				Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${response.realmID}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.realmService.Create(this.Realm).subscribe((response) => {
				Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${response.realmID}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}

		console.log(this.customKeycloackService.BusinessUserID);
		this.connection.invoke("Connect", this.customKeycloackService.BusinessUserID);
	}
	Clean(): void {
		this.Realm = new Realm();
	}
}
