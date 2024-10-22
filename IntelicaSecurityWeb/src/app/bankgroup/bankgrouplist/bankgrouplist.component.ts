import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActionDirective, ActionsMenuComponent } from 'intelica-components-ui';
import { ConfigService } from '../../common/services/config.service';
import { Router } from '@angular/router';
import CommonFeatureFlagService from '../../common/services/featureFlagCommon.service';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import {
  BankGroupResponse,
  BankGroupSimpleResponse,
} from '../dto/bankGroupResponses';
import { BankGroupService } from '../bankgroup.service';
import Swal from 'sweetalert2';
import { ViewDetailsBankComponent } from '../view-details-bank/view-details-bank.component';

@Component({
  selector: 'security-bankgrouplist',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbPaginationModule,
    ActionsMenuComponent,
    ActionDirective,
  ],
  templateUrl: './bankgrouplist.component.html',
  styleUrl: './bankgrouplist.component.css',
})
export class BankgrouplistComponent implements OnInit {
  //private readonly connection: HubConnection;
  private readonly ConfigService = inject(ConfigService);
  private readonly bankGroupService = inject(BankGroupService);
  private readonly router = inject(Router);
  private readonly modalService = inject(NgbModal);
  readonly featureFlagService = inject(CommonFeatureFlagService);
  @ViewChild('actionsMenu') actionsMenu!: ActionsMenuComponent;
  BanksGroup: BankGroupSimpleResponse[] = [];
  BanksGroupFilter: BankGroupSimpleResponse[] = [];
  BankGroupCode: string = '';
  BankGroupName: string = '';
  BankGroupDatabase: string = '';
  Page: number = 1;
  PageSize: number = 15;
  HtmlToExcel: HtmlToExcel = new HtmlToExcel();
  backBlueClass = false;
  
  constructor() {
    console.log('hola');
    /* 		this.connection = new HubConnectionBuilder().withUrl(`${this.ConfigService.environment?.hubPath}/featureflag`).build();
		this.connection.on('Refresh', () => this.featureFlagService.Refresh());
		this.connection.on('Connect', (message) => console.log(message)); */
  }
  ngOnInit(): void {
    /* 		this.connection
			.start()
			.then((_) => {
				console.log('WebSocket Connection Started');
			})
			.catch((error) => {
				return console.error(error);
			})
			.then(() => {
				this.connection.invoke('Connect', 'Bank');
			}); */

    this.Search();
  }

  Search(): void {
    this.bankGroupService
      .GetByFilter(
        this.BankGroupCode,
        this.BankGroupName,
        this.BankGroupDatabase
      )
      .subscribe((response) => {
        this.BanksGroup = response;
        this.Page = 1;
        this.RefreshList();
      });
  }
  RefreshList(): void {
    this.BanksGroupFilter = this.BanksGroup.slice(
      (this.Page - 1) * this.PageSize,
      this.Page * this.PageSize
    );
  }
  showBackBlue(value: boolean): void {
    this.backBlueClass = value;
  }
  Add(): void {
    this.router.navigate(['security/bankgroup/maintenance']);
  }
  EditRow(row: BankGroupSimpleResponse): void {
    this.router.navigate(['security/bankgroup/maintenance', row.bankGroupID]);
  }
  ViewDetail(row: BankGroupSimpleResponse): void {
	console.log(row);
	const modal = this.modalService.open(ViewDetailsBankComponent, { size: 'md' });
	modal.componentInstance.listbankGroupDetail = row.bankGroupDetails;
  }
  DeleteRow(row: BankGroupSimpleResponse): void {
    Swal.fire({
      title: 'Esta seguro quen desea eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bankGroupService.Delete(row.bankGroupID).subscribe((response) => {
          Swal.fire(
            'Informaci�n',
            `Banco con codigo <br/> <b> ${row.bankGroupID}</b>  <br/> ha sido eliminado correctamente`,
            'success'
          );
          this.Search();
        });
      } else if (result.isDenied) {
      }
    });
  }
  Export(): void {
    if (this.BanksGroup.length == 0) {
      Swal.fire('Information', 'There is no information to download.', 'info');
      return;
    }
    let body: string =
      '<tr><th>Bank name</th><th>Country</th><th>Contact Name</th></tr>';
    this.BanksGroup.forEach((row) => {
      body += `<tr><td>${row.bankGroupName}</td><td>${row.bankGroupDatabase}</td></tr>`;
    });
    this.HtmlToExcel.ExportTOExcel(
      'TableExport',
      body,
      `BankList`,
      'Bank list',
      'xlsx'
    );
  }
  exportFilter() {
    this.actionsMenu.closeAll();
    this.Export();
  }
  applyFilter() {
    this.actionsMenu.closeAll();
    this.Search();
  }
  ClerSearch() {
    this.BankGroupCode = '';
    this.BankGroupName = '';
    this.BankGroupDatabase = '';
  }
}
