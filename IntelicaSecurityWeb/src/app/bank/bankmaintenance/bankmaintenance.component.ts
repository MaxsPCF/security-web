import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Bank } from '../bank';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BankService } from '../bank.service';

@Component({
  selector: 'security-bankmaintenance',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './bankmaintenance.component.html',
})
export class BankmaintenanceComponent implements OnInit {
  ngOnInit(): void {
    this.bankid = this.activatedRoute.snapshot.params['id'];
    if (this.bankid != undefined && this.bankid != null) {
      this.bankService.Find(this.bankid).subscribe((response) => {
        this.Bank = response;
      });
    }
  }
  private readonly bankService = inject(BankService);
  private readonly router = inject(Router);
  Bank: Bank = new Bank();
  @ViewChild('bankForm', { read: NgForm }) bankForm: any;
  bankid: string = '';

  private activatedRoute = inject(ActivatedRoute);

  GetRows() {}
  Home() {}
  Back() {
    this.router.navigate(['security/bank/list']);
  }
  Submit() {
    if (!this.bankForm.valid) {
      Swal.fire('Información', 'Complete los campos necesarios', 'error');
      return;
    }
    if (this.bankid != undefined && this.bankid != null) {
      this.bankService.Update(this.Bank).subscribe((response) => {
        Swal.fire(
          'Información',
          `Banco con codigo <br/> <b> ${response.bankID}</b>  <br/> ha sido actualizado correctamente`,
          'success'
        );
        this.Back();
        this.Clean();
      });
    } else {
      this.bankService.Create(this.Bank).subscribe((response) => {
        Swal.fire(
          'Información',
          `Banco con codigo <br/> <b> ${response.bankID}</b>  <br/> ha sido registrada correctamente`,
          'success'
        );
        this.Back();
        this.Clean();
      });
    }
  }

  Clean(): void {
    this.Bank = new Bank();
  }
}
