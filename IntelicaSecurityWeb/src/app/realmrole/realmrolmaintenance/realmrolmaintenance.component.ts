import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { RealmRole } from '../realmRole';
import { RealmRoleService } from '../realmRole.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-realmrolmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './realmrolmaintenance.component.html',
	styleUrl: './realmrolmaintenance.component.css'
})
export class RealmrolmaintenanceComponent {
	private readonly router = inject(Router);
	private readonly realmRoleService = inject(RealmRoleService);
	private readonly realmService = inject(RealmService);
	private activatedRoute = inject(ActivatedRoute);

	RealmRole: RealmRole = new RealmRole();
	realms: Realm[] = [];
	RealmGroupID: string = '';
	@ViewChild('RealmRoleForm', { read: NgForm }) RealmRoleForm: any;
	Read: boolean = false;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
			console.log(this.realms);
		});

		this.RealmGroupID = this.activatedRoute.snapshot.params['id'];
		if (this.RealmGroupID != undefined && this.RealmGroupID != null) {
			this.realmRoleService.Find(this.RealmGroupID).subscribe((response) => {
				this.RealmRole = response;
			});
		}
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/realmrole/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		console.log(this.RealmRoleForm.valid);
		if (!this.RealmRoleForm.valid) {
			Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.RealmGroupID != undefined && this.RealmGroupID != null && this.RealmGroupID != '') {
			this.realmRoleService.Update(this.RealmRole).subscribe((response) => {
				Swal.fire('Informacion', `Realm Role con codigo <br/> <b> ${response.id}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.realmRoleService.Create(this.RealmRole).subscribe((response) => {
				Swal.fire('Informacion', `Realm Role con codigo <br/> <b> ${response.id}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.RealmRole = new RealmRole();
	}
}
