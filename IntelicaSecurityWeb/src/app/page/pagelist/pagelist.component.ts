import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PageSimpleResponse } from '../dto/pageResponses';
import { PageService } from '../page.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { ActionDirective, ActionsMenuComponent } from 'intelica-components-ui';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlToExcel } from '../../common/HtmlToExcel';
import Swal from 'sweetalert2';

@Component({
  selector: 'security-pagelist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPaginationModule, ActionsMenuComponent, ActionDirective],
  templateUrl: './pagelist.component.html',
  styleUrl: './pagelist.component.css',
})
export class PagelistComponent implements OnInit {
  private readonly pageService = inject(PageService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);

  Pages: PageSimpleResponse[] = [];
  PagesFilter: PageSimpleResponse[] = [];
  PageName: string = '';
  Page: number = 1;
  PageSize: number = 10;
  HtmlToExcel: HtmlToExcel = new HtmlToExcel();
  backBlueClass = false;
  @ViewChild('actionsMenu') actionsMenu!: ActionsMenuComponent;

  ngOnInit(): void {
    this.GetAll();
  }

  Home() { }

  GetAll() {
    this.pageService.GetAll().subscribe((response) => {
      this.Pages = response;
      this.Page = 1;
      this.RefreshList();
    });
  }

  Add() {
    this.router.navigate(['security/page/maintenance']);
  }

  Export() {
    if (this.Pages.length == 0) {
      Swal.fire('Information', 'There is no information to download.', 'info');
      return;
    }
    let body: string = '<tr><th>Page name</th><th>Page url</th></tr>';
    this.Pages.forEach((row) => {
      body += `<tr><td>${row.pageName}</td><td>${row.pageUrl}</td> </tr>`;
    });
    this.HtmlToExcel.ExportTOExcel('TableExport', body, `PageList`, 'Page list', 'xlsx');
  }

  EditRow(row: PageSimpleResponse) {
    this.router.navigate(['security/page/maintenance'], {
      queryParams: { pageID: row.pageId },
    });
  }

  DeleteRow(row: PageSimpleResponse) {
    this.sweetAlertService
      .confirmBox('Do you want to delete this page?', 'Yes', 'No')
      .then((response) => {
        if (response.isConfirmed) {
          this.pageService.Delete(row.pageId).subscribe({
            next: (response) => {
              if (response.pageId !== '') {
                this.sweetAlertService.messageTextBox(
                  'Process successfully completed.'
                );
                this.GetAll();
              }
            },
            error: (error) => { },
            complete: () => { },
          });
        }
      });
  }
  exportFilter() {
    this.actionsMenu.closeAll();
    this.Export();
  }
  showBackBlue(value: boolean): void {
    this.backBlueClass = value;
  }
  RefreshList() {
    this.PagesFilter = this.Pages.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
  }
}
