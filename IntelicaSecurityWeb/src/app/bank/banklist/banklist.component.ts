import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BankSimpleResponse } from '../dto/bankResponses';
import { BankService } from '../bank.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'security-banklist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './banklist.component.html',
})
export class BanklistComponent implements OnInit {
  ngOnInit(): void {
    this.Search();
  }
  BankCode: string = '';
  BankName: string = '';
  Banks: BankSimpleResponse[] = [];
  private readonly bankService = inject(BankService);
  private readonly router = inject(Router);

  Home() {}
  Search() {
    this.bankService
      .GetByFilter(this.BankCode, this.BankName)
      .subscribe((response) => {
        this.Banks = response;
      });
  }
  Add() {
    this.router.navigate(['security/bank/maintenance']);
  }
  Export() {}
  EditRow(row: BankSimpleResponse) {
    this.router.navigate(['security/bank/maintenance', row.bankID]);
  }
  DeleteRow(row: BankSimpleResponse) {
    Swal.fire({
      title: 'Esta seguro quen desea eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bankService.Delete(row.bankID).subscribe((response2) => {
          Swal.fire(
            'Información',
            `Banco con codigo <br/> <b> ${row.bankID}</b>  <br/> ha sido eliminado correctamente`,
            'success'
          );
          this.Search();
        });
      } else if (result.isDenied) {
      }
    });
  }
}
