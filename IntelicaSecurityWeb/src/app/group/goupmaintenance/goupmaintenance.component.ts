import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealmGroup, RealmGroupRoles } from '../realmGroup';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RealmGroupService } from '../realmGroup.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealmService } from '../../realm/realm.service';
import { Realm } from '../../realm/realm';
import { RealmRoleSimpleResponse } from '../../rol/dto/realmRoleResponses';
import { RealmRoleService } from '../../rol/realmRole.service';
import { Guid } from 'guid-typescript';
@Component({
	selector: 'security-goupmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './goupmaintenance.component.html'
})
export class GoupmaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly realmService = inject(RealmService);
	private readonly realmRoleService = inject(RealmRoleService);
	private activatedRoute = inject(ActivatedRoute);
	RealmGroup: RealmGroup = new RealmGroup();
	realms: Realm[] = [];
	roles: RealmRoleSimpleResponse[] = [];
	rolesSelected: RealmRoleSimpleResponse[] = [];
	// groupRoles: string[] = [];
	groupRoles: string[] = [];
	realmGroupId: string = '';
	Read: boolean = false;

	@ViewChild('clientForm', { read: NgForm }) clientForm: any;

	ngOnInit(): void {
		this.realmService.GetAll().subscribe((response) => {
			this.realms = response;
		});
		this.realmRoleService.GetAll().subscribe((response) => {
			this.roles = response;
		});

		this.realmGroupId = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		if (this.realmGroupId != undefined && this.realmGroupId != null) {
			this.realmGroupService.Find(this.realmGroupId).subscribe((response) => {
				this.RealmGroup = response;
				this.groupRoles = this.RealmGroup.realmGroupRoles.map((x) => x.realmRoleId);
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
		const roleCrud: RealmGroupRoles[] = [];
		const rolesAll = this.roles;
		this.groupRoles.forEach(function (value: string) {
			let rowrole = rolesAll.find((x) => x.realmRoleId == value);
			if (rowrole)
				roleCrud.push({
					realmGroupRoleId: Guid.EMPTY,
					realmGroupId: Guid.EMPTY,
					realmRoleId: rowrole.realmRoleId,
					realmRoleName: rowrole.realmRoleName,
					realmRoleDescription: rowrole.realmRoleDescription
				});
		});
		this.RealmGroup.realmGroupRoles = roleCrud;
		if (this.realmGroupId != undefined && this.realmGroupId != null && this.realmGroupId != '') {
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
		console.log(event);
		this.rolesSelected = event;
	}
}
