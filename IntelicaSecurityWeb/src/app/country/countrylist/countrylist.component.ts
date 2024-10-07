import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountrySimpleResponse } from '../dto/countryResponses';
import { CountryService } from '../country.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionDirective, ActionsMenuComponent } from 'intelica-components-ui';

@Component({
	selector: 'security-countrylist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPaginationModule, ActionsMenuComponent, ActionDirective],
	templateUrl: './countrylist.component.html'
})
export class CountrylistComponent implements OnInit {
	@ViewChild('actionsMenu') actionsMenu!: ActionsMenuComponent;
	private readonly CountryService = inject(CountryService);
	private readonly router = inject(Router);

	ngOnInit(): void {
		this.Search();
	}
	CountryCode: string = '';
	CountryName: string = '';
	Countries: CountrySimpleResponse[] = [];
	CountriesFilter: CountrySimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	backBlueClass = false;

	Home() { }
	Search() {
		this.CountryService.GetByFilter(this.CountryCode, this.CountryName).subscribe((response) => {
			this.Countries = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	Add() {
		this.router.navigate(['security/country/maintenance']);
	}
	Export() {
		if (this.Countries.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Country code</th><th>Country name</th></tr>';
		this.Countries.forEach((row) => {
			body += `<tr><td>${row.countryID}</td><td>${row.countryName}</td> </tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `CountryList`, 'Country list', 'xlsx');
	}
	EditRow(row: CountrySimpleResponse) {
		this.router.navigate(['security/country/maintenance', row.countryID]);
	}
	ViewDetail(row: CountrySimpleResponse) {
		this.router.navigate(['security/country/maintenance', true, row.countryID]);
	}

	DeleteRow(row: CountrySimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.CountryService.Delete(row.countryID).subscribe((response2) => {
					Swal.fire('Informaci�n', `Banco con codigo <br/> <b> ${row.countryID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.CountriesFilter = this.Countries.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	applyFilter() {
		this.actionsMenu.closeAll();
		this.Search();
	}
	ClerSearch() {
		this.CountryCode = '';
		this.CountryName = '';
	}
	exportFilter() {
		this.actionsMenu.closeAll();
		this.Export();
	}

	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}
}
