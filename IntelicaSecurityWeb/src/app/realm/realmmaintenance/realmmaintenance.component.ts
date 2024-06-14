import { Component, ViewChild, inject } from '@angular/core';
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
	realmCode: string = '';
	@ViewChild('realmForm', { read: NgForm }) realmForm: any;

	ngOnInit() {
		this.realmCode = this.activatedRoute.snapshot.params['id'];
		console.log(this.realmCode);
		if (this.realmCode != undefined && this.realmCode != null) {
			this.realmService.Find(this.realmCode).subscribe((response) => {
				this.Realm = response;
			});
		}
	}
	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/realm/list']);
	}
	Submit() {
		if (!this.realmForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.realmCode != undefined && this.realmCode != null && this.realmCode != '') {
			this.realmService.Update(this.Realm).subscribe((response) => {
				Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${response.realmCode}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.realmService.Create(this.Realm).subscribe((response) => {
				Swal.fire('Informaci�n', `Reino con codigo <br/> <b> ${response.realmCode}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.Realm = new Realm();
	}
}
