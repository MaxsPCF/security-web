import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RealmRole } from '../realmRole';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { RealmRoleService } from '../realmRole.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Realm } from '../../realm/realm';
@Component({
	selector: 'security-rolmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './rolmaintenance.component.html'
})
export class RolmaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly realmRoleService = inject(RealmRoleService);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);

	RealmRole: RealmRole = new RealmRole();
	realms: Realm[] = [];
	realmGroupId: string = '';

	Read: boolean = false;

	@ViewChild('roleForm', { read: NgForm }) clientForm: any;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
			console.log(this.realms);
		});

		this.realmGroupId = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		if (this.realmGroupId != undefined && this.realmGroupId != null) {
			this.realmRoleService.Find(this.realmGroupId).subscribe((response) => {
				this.RealmRole = response;
			});
		}
	}
	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/role/list']);
	}
	Submit() {
		console.log(this.clientForm.valid);
		if (!this.clientForm.valid) {
			Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.realmGroupId != undefined && this.realmGroupId != null && this.realmGroupId != '') {
			this.realmRoleService.Update(this.RealmRole).subscribe((response) => {
				Swal.fire('Informacion', `Rol con codigo <br/> <b> ${response.id}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.realmRoleService.Create(this.RealmRole).subscribe((response) => {
				Swal.fire('Informacion', `Rol con codigo <br/> <b> ${response.id}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.RealmRole = new RealmRole();
	}
}
