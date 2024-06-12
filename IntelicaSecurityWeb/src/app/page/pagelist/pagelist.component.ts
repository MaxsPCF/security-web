import { Component, OnInit, inject } from '@angular/core';
import { PageSimpleResponse } from '../dto/pageResponses';
import { PageService } from '../page.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../common/services/sweet-alert.service';

@Component({
  selector: 'security-pagelist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './pagelist.component.html',
  styleUrl: './pagelist.component.css',
})
export class PagelistComponent implements OnInit {
  private readonly pageService = inject(PageService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);

  pageList: PageSimpleResponse[] = [];

  ngOnInit(): void {
    this.GetAll();
  }

  Home() {}

  GetAll() {
    this.pageService.GetAll().subscribe((response) => {
      this.pageList = response;
    });
  }

  Add() {
    this.router.navigate(['security/page/maintenance']);
  }

  Export() {}

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
            error: (error) => {},
            complete: () => {},
          });
        }
      });
  }
}
