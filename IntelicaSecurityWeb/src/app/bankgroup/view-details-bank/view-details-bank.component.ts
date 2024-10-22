import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BankSimpleResponse } from '../../bank/dto/bankResponses';
import { BankGroupDetailSimpleResponse } from '../dto/bankGroupResponses';
import { BankService } from '../../bank/bank.service';

@Component({
  selector: 'security-view-details-bank',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './view-details-bank.component.html',
  styleUrl: './view-details-bank.component.css'
})
export class ViewDetailsBankComponent implements OnInit {
	public readonly activeModal = inject(NgbActiveModal);
  private readonly bankService = inject(BankService);
  Banks: BankSimpleResponse[] = [];
  @Input() listbankGroupDetail: BankGroupDetailSimpleResponse[] = [];
  listbank: BankSimpleResponse[] = [];
  bankListFilter: BankSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;

	ngOnInit(): void {
    this.bankService.GetByFilter('','').subscribe((response) => {
      this.Banks = response;
      this.filterBanks();
    });

	}

  filterBanks(): void {
    const bankIDs = this.listbankGroupDetail.map(bankDetail => bankDetail.bankID);
    this.listbank = this.Banks.filter(bank => bankIDs.includes(bank.bankID));
    this.RefreshList();
  }
	RefreshList() {
		this.bankListFilter = this.listbank.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
