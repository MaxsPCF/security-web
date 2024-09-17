import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessUserPage, BusinessUserSimpleResponses } from '../../dto/businessUserResponses';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { BusinessuserService } from '../../businessuser.service';
import { ProfileService } from '../../../profile/profile.service';

@Component({
	selector: 'security-view-details-pages',
	standalone: true,
	imports: [FormsModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule],
	templateUrl: './view-details-pages.component.html',
	styleUrl: './view-details-pages.component.css'
})
export class ViewDetailsPagesComponent implements OnInit {
	public readonly activeModal = inject(NgbActiveModal);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly profileService = inject(ProfileService);

	BusinessUserByID: BusinessUserSimpleResponses = {} as BusinessUserSimpleResponses;
	pageListUser: BusinessUserPage[] = [];

	@Input() businessUserID: string = '';

	@ViewChild('matPaginatorPages') paginatorPages!: MatPaginator;
	@ViewChild('sortPages') sortPages!: MatSort;

	displayedColumnsPages: string[] = ['index', 'pageName', 'businessUserCanCreate', 'businessUserCanUpdate', 'businessUserCanDelete'];
	dataSourcePages!: MatTableDataSource<BusinessUserPage>;

	ngOnInit(): void {
		console.log('this.businessUserID', this.businessUserID);
		this.getBusinessUser();
	}

	applyFilterPages(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourcePages.filter = filterValue.trim().toLowerCase();

		if (this.dataSourcePages.paginator) {
			this.dataSourcePages.paginator.firstPage();
		}
	}

	getBusinessUser() {
		const getAllServicesBU = forkJoin({
			userByID: this.businessUserService.GetById(this.businessUserID)
		});
		getAllServicesBU.subscribe({
			next: (response) => {
				this.BusinessUserByID = response.userByID;

				if (this.BusinessUserByID.profileID !== null) {
					this.profileService.GetById(this.BusinessUserByID.profileID).subscribe((responseProfile) => {
						this.pageListUser = [];

						responseProfile.profilePages.forEach((itemPage) => {
							let _page =
								this.BusinessUserByID.businessUserPages !== undefined
									? this.BusinessUserByID.businessUserPages.find((f) => f.pageID === itemPage.pageID)
									: undefined;

							if (_page !== undefined) {
								let _item: BusinessUserPage = new BusinessUserPage();
								_item.businessUserPageID = _page.businessUserPageID;
								_item.pageID = itemPage.pageID;
								_item.pageName = itemPage.pageName;
								_item.businessUserCanUpdate = _page.businessUserCanUpdate;
								_item.businessUserCanCreate = _page.businessUserCanCreate;
								_item.businessUserCanDelete = _page.businessUserCanDelete;
								this.pageListUser.push(_item);
							}
						});

						this.dataSourcePages = new MatTableDataSource(this.pageListUser);

						this.dataSourcePages.paginator = this.paginatorPages;
						this.dataSourcePages.sort = this.sortPages;
					});
				}
			},
			error: (error) => {},
			complete: () => {}
		});
	}
}
