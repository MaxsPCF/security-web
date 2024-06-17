import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RealmGroup } from '../realmGroup';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { RealmGroupService } from '../realmGroup.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Realm } from '../../realm/realm';

@Component({
	selector: 'security-goupmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './goupmaintenance.component.html'
})
export class GoupmaintenanceComponent {
	private readonly router = inject(Router);
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);

	RealmGroup: RealmGroup = new RealmGroup();
	realms: Realm[] = [];
	realmGroupCode: string = '';
	@ViewChild('clientForm', { read: NgForm }) clientForm: any;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
			console.log(this.realms);
		});

		this.realmGroupCode = this.activatedRoute.snapshot.params['id'];
		if (this.realmGroupCode != undefined && this.realmGroupCode != null) {
			this.realmGroupService.Find(this.realmGroupCode).subscribe((response) => {
				this.RealmGroup = response;
			});
		}
	}
	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/group/list']);
	}
	Submit() {
		console.log(this.clientForm.valid);
		if (!this.clientForm.valid) {
			Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.realmGroupCode != undefined && this.realmGroupCode != null && this.realmGroupCode != '') {
			this.realmGroupService.Update(this.RealmGroup).subscribe((response) => {
				Swal.fire('Informacion', `Grupo con codigo <br/> <b> ${response.id}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.realmGroupService.Create(this.RealmGroup).subscribe((response) => {
				Swal.fire('Informacion', `Grupo con codigo <br/> <b> ${response.id}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.RealmGroup = new RealmGroup();
	}
}
