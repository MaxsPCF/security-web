import { AfterContentChecked, Component, OnInit, afterRender, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BankSimpleResponse } from '../dto/bankResponses';
import { BankService } from '../bank.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import { CustomFeatureFlagService } from '../../common/services/custom-feature-flag.service';

@Component({
	selector: 'security-banklist',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPaginationModule],
	templateUrl: './banklist.component.html'
})
export class BanklistComponent implements OnInit, AfterContentChecked {
	constructor(private featureFlagService: CustomFeatureFlagService) {
		// afterRender(() => {
		// 	this.IsVisibleFeature = this.featureFlagService.featureOn('ActivatedNewDemo');
		// });
	}
	ngOnInit(): void {
		this.Search();
	}

	ngAfterContentChecked(): void {
		this.IsVisibleFeature = this.featureFlagService.featureOn('ActivatedNewDemo');
	}

	BankCode: string = '';
	BankName: string = '';
	Banks: BankSimpleResponse[] = [];
	BanksFilter: BankSimpleResponse[] = [];
	IsVisibleFeature: boolean = false;

	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();

	private readonly bankService = inject(BankService);
	// private readonly featureFlagService = inject(FeatureFlagService);
	private readonly router = inject(Router);

	Home() {}
	Search() {
		this.bankService.GetByFilter(this.BankCode, this.BankName).subscribe((response) => {
			this.Banks = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	Add() {
		this.router.navigate(['security/bank/maintenance']);
	}
	Export() {
		if (this.Banks.length == 0) {
			Swal.fire('Information', 'There is no information to download.', 'info');
			return;
		}
		let body: string = '<tr><th>Bank name</th><th>Country</th><th>Contact Name</th></tr>';
		this.Banks.forEach((row) => {
			body += `<tr><td>${row.bankName}</td><td>${row.countryName}</td> <td>${row.contactName}</td> </tr>`;
		});
		this.HtmlToExcel.ExportTOExcel('TableExport', body, `BankList`, 'Bank list', 'xlsx');
	}
	EditRow(row: BankSimpleResponse) {
		this.router.navigate(['security/bank/maintenance', row.bankID]);
	}
	ViewDetail(row: BankSimpleResponse) {
		this.router.navigate(['security/bank/maintenance', true, row.bankID]);
	}

	DeleteRow(row: BankSimpleResponse) {
		Swal.fire({
			title: 'Esta seguro quen desea eliminar este registro?',
			showDenyButton: true,
			confirmButtonText: 'S�',
			denyButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				this.bankService.Delete(row.bankID).subscribe((response2) => {
					Swal.fire('Informaci�n', `Banco con codigo <br/> <b> ${row.bankID}</b>  <br/> ha sido eliminado correctamente`, 'success');
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.BanksFilter = this.Banks.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
