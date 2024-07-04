import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Country } from '../country';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CountryService } from '../country.service';
@Component({
	selector: 'security-countrymaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './countrymaintenance.component.html'
})
export class CountrymaintenanceComponent implements OnInit {
	private readonly countryService = inject(CountryService);
	private readonly router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);

	Country: Country = new Country();
	@ViewChild('countryForm', { read: NgForm }) countryForm: any;
	countryid: string = '';
	IsEdit: boolean = false;
	Read: boolean = false;

	ngOnInit(): void {
		this.countryid = this.activatedRoute.snapshot.params['id'];
		this.Read = this.activatedRoute.snapshot.params['read'];
		this.IsEdit = this.countryid != undefined && this.countryid != null;
		if (this.countryid != undefined && this.countryid != null) {
			this.countryService.Find(this.countryid).subscribe((response) => {
				this.Country = response;
			});
		}
	}

	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/country/list']);
	}
	Submit() {
		if (!this.countryForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.countryid != undefined && this.countryid != null) {
			this.countryService.Update(this.Country).subscribe((response) => {
				Swal.fire('Informaci�n', `Pa�s con codigo <br/> <b> ${response.countryID}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.countryService.Create(this.Country).subscribe((response) => {
				Swal.fire('Informaci�n', `Pa�s con codigo <br/> <b> ${response.countryID}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}

	Clean(): void {
		this.Country = new Country();
	}
}
