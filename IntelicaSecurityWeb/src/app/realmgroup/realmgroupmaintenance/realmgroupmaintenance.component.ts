import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import Swal from 'sweetalert2';
import { Realm } from '../../realm/realm';
import { RealmService } from '../../realm/realm.service';
import { RealmRoleSimpleResponse } from '../../realmrole/dto/realmRoleResponses';
import { RealmRoleService } from '../../realmrole/realmRole.service';
import { RealmGroup, RealmGroupRoles } from '../realmGroup';
import { RealmGroupService } from '../realmGroup.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-realmgroupmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './realmgroupmaintenance.component.html',
	styleUrl: './realmgroupmaintenance.component.css'
})
export class RealmgroupmaintenanceComponent {
	private readonly router = inject(Router);
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private readonly realmRoleService = inject(RealmRoleService);
	private activatedRoute = inject(ActivatedRoute);
	RealmGroup: RealmGroup = new RealmGroup();
	realms: Realm[] = [];
	roles: RealmRoleSimpleResponse[] = [];
	rolesSelected: RealmRoleSimpleResponse[] = [];
	groupRoles: string[] = [];
	RealmGroupID: string = '';
	@ViewChild('RealmGroupForm', { read: NgForm }) RealmGroupForm: any;
	Read: boolean = false;
	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});
		this.RealmGroupID = this.activatedRoute.snapshot.params['id'];
		if (this.RealmGroupID != undefined && this.RealmGroupID != null) {
			this.realmGroupService.Find(this.RealmGroupID).subscribe((response) => {
				this.RealmGroup = response;
				console.log(response.realmID);
				this.ChangeRealm(response);
				this.groupRoles = this.RealmGroup.realmGroupRoles.map((x) => x.realmRoleId);
			});
		}
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/realmgroup/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		if (!this.RealmGroupForm.valid) {
			Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
			return;
		}
		const roleCrud: RealmGroupRoles[] = [];
		const rolesAll = this.roles;
		this.groupRoles.forEach(function (value: string) {
			let rowrole = rolesAll.find((x) => x.realmRoleID == value);
			if (rowrole)
				roleCrud.push({
					realmGroupRoleId: Guid.EMPTY,
					realmGroupId: Guid.EMPTY,
					realmRoleId: rowrole.realmRoleID,
					realmRoleName: rowrole.realmRoleName,
					realmRoleDescription: rowrole.realmRoleDescription
				});
		});
		this.RealmGroup.realmGroupRoles = roleCrud;
		if (this.RealmGroupID != undefined && this.RealmGroupID != null && this.RealmGroupID != '') {
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
	onMaterialGroupChange(event: RealmRoleSimpleResponse[]) {
		this.rolesSelected = event;
	}

	ChangeRealm(e: any) {
		if (e)
			this.realmRoleService.GetRealmRolesByRealm(e.realmID).subscribe((response) => {
				this.roles = response;
			});
		else this.roles = [];
	}
}
