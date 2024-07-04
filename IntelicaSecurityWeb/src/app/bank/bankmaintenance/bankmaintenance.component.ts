import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Bank } from '../bank';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BankService } from '../bank.service';
import { CountrySimpleResponse } from '../../country/dto/countryResponses';
import { CountryService } from '../../country/country.service';

@Component({
	selector: 'security-bankmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './bankmaintenance.component.html'
})
export class BankmaintenanceComponent implements OnInit {
	private readonly bankService = inject(BankService);
	private readonly countryService = inject(CountryService);

	private readonly router = inject(Router);
	Bank: Bank = new Bank();
	@ViewChild('bankForm', { read: NgForm }) bankForm: any;
	bankid: string = '';
	Countries: CountrySimpleResponse[] = [];

	Read: boolean = false;

	private activatedRoute = inject(ActivatedRoute);

	ngOnInit(): void {
		this.countryService.GetByAll().subscribe((response1) => {
			this.Countries = response1;
			this.bankid = this.activatedRoute.snapshot.params['id'];
			this.Read = this.activatedRoute.snapshot.params['read'];
			if (this.bankid != undefined && this.bankid != null) {
				this.bankService.Find(this.bankid).subscribe((response) => {
					this.Bank = response;
				});
			}
		});
	}

	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/bank/list']);
	}
	Submit() {
		if (!this.bankForm.valid) {
			Swal.fire('Informaci�n', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.bankid != undefined && this.bankid != null) {
			this.bankService.Update(this.Bank).subscribe((response) => {
				Swal.fire('Informaci�n', `Banco con codigo <br/> <b> ${response.bankID}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.bankService.Create(this.Bank).subscribe((response) => {
				Swal.fire('Informaci�n', `Banco con codigo <br/> <b> ${response.bankID}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}

	Clean(): void {
		this.Bank = new Bank();
	}
}
