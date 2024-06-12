import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageCommand } from '../dto/pageRequests';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { PageService } from '../page.service';

@Component({
  selector: 'security-pagemaintenance',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './pagemaintenance.component.html',
  styleUrl: './pagemaintenance.component.css',
})
export class PagemaintenanceComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly pageService = inject(PageService);
  private ngActivatedRoute = inject(ActivatedRoute);

  page: PageCommand = new PageCommand();
  parameters: Params | undefined = undefined;
  pageId: string = '';
  swEdit: Boolean = false;

  ngOnInit(): void {
    this.ngActivatedRoute.queryParams.subscribe((parameters) => {
      this.parameters = parameters;
      this.pageId = this.parameters['pageID'];
      if (this.pageId !== '' && this.pageId !== undefined) {
        this.swEdit = true;
        this.GetPage();
      }
    });
  }

  GetPage() {
    this.pageService.Find(this.pageId).subscribe((response) => {
      let page = response;
      this.page.pageID = page[0].pageId;
      this.page.pageName = page[0].pageName;
      this.page.pageUrl = page[0].pageUrl;
    });
  }

  Home() {}

  Back() {
    this.router.navigate(['security/page/list']);
  }

  Submit() {
    const swError = this.validateCreate(this.page);
    if (swError) {
      this.sweetAlertService.messageTextBox(
        'Please complete all mandatory fields or correct wrong values to continue.'
      );
      return;
    }

    this.sweetAlertService
      .confirmBox('Are you sure you want to save the changes?', 'Yes', 'No')
      .then((response) => {
        if (response.isConfirmed) {
          if (!this.swEdit) {
            this.pageService.Create(this.page).subscribe({
              next: (response) => {
                if (response.pageId !== '') {
                  this.sweetAlertService.messageTextBox(
                    'Process successfully completed.'
                  );
                }
              },
              error: (error) => {},
              complete: () => {},
            });
          } else {
            this.pageService.Update(this.page).subscribe((response) => {
              if (response.pageId !== '') {
                this.sweetAlertService.messageTextBox(
                  'Process successfully completed.'
                );
              }
            });
          }
        }
      });
  }

  validateCreate(param: PageCommand): boolean {
    let parameter = param;
    let swValidate: boolean = false;
    if (this.swEdit) {
      if (parameter.pageID?.trim() === '') swValidate = true;
    }
    if (parameter.pageName?.trim() === '') swValidate = true;
    if (parameter.pageUrl?.trim() === '') swValidate = true;

    return swValidate;
  }
}
