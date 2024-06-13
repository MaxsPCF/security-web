import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountrySimpleResponse } from '../dto/countryResponses';
import { CountryService } from '../country.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'security-countrylist',
  standalone: true,

  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './countrylist.component.html',
})
export class CountrylistComponent implements OnInit {
  ngOnInit(): void {
    this.Search();
  }
  CountryCode: string = '';
  CountryName: string = '';
  Countrys: CountrySimpleResponse[] = [];
  private readonly CountryService = inject(CountryService);
  private readonly router = inject(Router);

  Home() {}
  Search() {
    this.CountryService.GetByFilter(
      this.CountryCode,
      this.CountryName
    ).subscribe((response) => {
      this.Countrys = response;
    });
  }
  Add() {
    this.router.navigate(['security/country/maintenance']);
  }
  Export() {}
  EditRow(row: CountrySimpleResponse) {
    this.router.navigate(['security/country/maintenance', row.countryID]);
  }
  DeleteRow(row: CountrySimpleResponse) {
    Swal.fire({
      title: 'Esta seguro quen desea eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CountryService.Delete(row.countryID).subscribe((response2) => {
          Swal.fire(
            'Información',
            `Banco con codigo <br/> <b> ${row.countryID}</b>  <br/> ha sido eliminado correctamente`,
            'success'
          );
          this.Search();
        });
      } else if (result.isDenied) {
      }
    });
  }
}
