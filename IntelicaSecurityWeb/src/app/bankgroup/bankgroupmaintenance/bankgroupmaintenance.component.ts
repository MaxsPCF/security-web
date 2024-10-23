import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BankSimpleResponse } from '../../bank/dto/bankResponses';
import { BankGroup } from '../bankgroup';
import { BankGroupService } from '../bankgroup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../bank/bank.service';
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { Guid } from 'guid-typescript';
import { BankGroupDetailSimpleResponse } from '../dto/bankGroupResponses';

@Component({
  selector: 'security-bankgroupmaintenance',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    NgbPaginationModule,
  ],
  templateUrl: './bankgroupmaintenance.component.html',
  styleUrls: ['./bankgroupmaintenance.component.css'], 
})
export class BankgroupmaintenanceComponent implements OnInit {
  bankGroupid: string = '';
  Read: boolean = false;
  Banks: BankSimpleResponse[] = [];
  BanksFilter: BankSimpleResponse[] = [];
  BankGroup: BankGroup = new BankGroup();
  Page: number = 1;
  PageSize: number = 10;
  indeterminate: boolean = false;
  checked: boolean = false;
  selectedBankId: string | null = null;
  checkboxes: { [key: string]: boolean } = {};
  allSelected: boolean = false;
  isEdit: boolean = false;
  searchTerm: string = '';
  private readonly bankGroupService = inject(BankGroupService);
  private readonly bankService = inject(BankService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);
  private activatedRoute = inject(ActivatedRoute);
  
  @ViewChild('bankGroupForm', { read: NgForm }) bankGroupForm: any;

  ngOnInit(): void {
    this.bankGroupid = this.activatedRoute.snapshot.params['id'];
    if (this.bankGroupid) {
      this.isEdit = true;
      forkJoin({
        bankGroup: this.bankGroupService.Find(this.bankGroupid),
        banks: this.bankService.GetByFilter('', ''),
      }).subscribe(({ bankGroup, banks }) => {
        this.BankGroup = bankGroup;
        this.Banks = banks;
        this.initializeCheckboxes();
        this.RefreshList(); 
      });
    } else {
      this.getAllBanks();
    }
  }

  getAllBanks() {
    this.bankService.GetByFilter('', '').subscribe(banks => {
      this.Banks = banks;
      this.initializeCheckboxes();
      this.RefreshList();
    });
  }

  initializeCheckboxes(): void {
    this.checkboxes = {};
    this.Banks.forEach((bank) => {
      this.checkboxes[bank.bankID] = this.BankGroup.bankGroupDetails.some(
        (detail) => detail.bankID === bank.bankID
      );
    });
  }

  Back() {
    this.router.navigate(['security/bankgroup/list']);
  }

  @HostListener('window:keydown.alt.s', ['$event'])
  Submit() {
    if (!this.bankGroupForm.valid) {
      this.sweetAlertService.messageTextBox('Complete the required fields.');
      return;
    }
    const updatedDetails: BankGroupDetailSimpleResponse[] = [];
    this.Banks.forEach((bank) => {
      if (this.checkboxes[bank.bankID]) {
        const existingDetail = this.BankGroup.bankGroupDetails.find(
          (detail) => detail.bankID === bank.bankID
        );
        updatedDetails.push({
          bankGroupDetailID: existingDetail
            ? existingDetail.bankGroupDetailID
            : Guid.EMPTY,
          bankGroupID: this.BankGroup.bankGroupID,
          bankID: bank.bankID
        });
      }
    });
    this.BankGroup.bankGroupDetails = updatedDetails;
    this.sweetAlertService
      .confirmBox('Are you sure you want to save the changes?', 'Yes', 'No')
      .then((response) => {
        if (response.isConfirmed) {
          const request = this.isEdit
            ? this.bankGroupService.Update(this.BankGroup)
            : this.bankGroupService.Create(this.BankGroup);

          request.subscribe(() => {
            this.sweetAlertService.messageTextBox(
              'Process successfully completed.'
            );
          });
        }
      });
  }

  Clean(): void {
    this.BankGroup = new BankGroup();
  }

  onSelectAllChange(event: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.allSelected = isChecked;
    this.Banks.forEach((bank) => {
      this.checkboxes[bank.bankID] = isChecked;
    });
    this.RefreshList();
  }

  RefreshList() {
    const startIndex = (this.Page - 1) * this.PageSize;
    const endIndex = this.Page * this.PageSize;
    const filteredBanks = this.Banks.filter(bank =>
      bank.bankName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.BanksFilter = filteredBanks.slice(startIndex, endIndex);
  }

}
