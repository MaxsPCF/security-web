import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Realm } from '../realm';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RealmService } from '../realm.service';
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

	Realm: Realm = new Realm();
	RealmCode: string = '';
	@ViewChild('RealmForm', { read: NgForm }) RealmForm: any;
	Read: boolean = false;

	ngOnInit() {
		this.RealmCode = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		if (this.RealmCode != undefined && this.RealmCode != null) {
			this.realmService.Find(this.RealmCode).subscribe((response) => {
				this.Realm = response;
			});
		}
		if (this.RealmCode == undefined && this.RealmCode == null) this.Read = false;
	}
	GetRows() {}
	Home() {}
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
		if (this.RealmCode != undefined && this.RealmCode != null && this.RealmCode != '') {
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
	}
	Clean(): void {
		this.Realm = new Realm();
	}
}
