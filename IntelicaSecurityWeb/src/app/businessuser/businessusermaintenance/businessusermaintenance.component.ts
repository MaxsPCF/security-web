import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileSimpleResponses } from '../../profile/dto/profileResponses';
import { ProfileService } from '../../profile/profile.service';
import { BusinessuserService } from '../businessuser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BusinessUserBank, BusinessUserBankGroup, BusinessUserPage, BusinessUserSimpleResponses } from '../dto/businessUserResponses';
import { forkJoin } from 'rxjs';
import { BusinessUserRequest } from '../dto/businessUser';
import { BankSimpleResponse } from '../../bank/dto/bankResponses';
import { BankGroupSimpleResponse } from '../../bankgroup/dto/bankGroupResponses';
import { BankGroupService } from '../../bankgroup/bankgroup.service';
import { BankService } from '../../bank/bank.service';
import { Guid } from 'guid-typescript';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { BusinessUserPageRequest } from '../dto/businessUserPage';
import { BusinessUserBankRequest } from '../dto/businessUserBank';
import { BusinessUserBankGroupRequest } from '../dto/businessUserBankGroup';

@Component({
	selector: 'security-businessusermaintenance',
	standalone: true,
	imports: [
		NgSelectModule,
		FormsModule,
		MatCardModule,
		MatStepperModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatTooltipModule,
		MatCheckboxModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule
	],
	templateUrl: './businessusermaintenance.component.html',
	styleUrl: './businessusermaintenance.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessusermaintenanceComponent implements OnInit {
	// private readonly realmService = inject(RealmService);
	// private readonly realmGroupService = inject(RealmGroupService);
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly bankService = inject(BankService);
	private readonly bankGroupService = inject(BankGroupService);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly sweetAlertService = inject(SweetAlertService);

	@ViewChild('BusinessUserForm', { read: NgForm }) BusinessUserForm: any;

	businessUserID: string = '';
	Read: boolean = false;
	checkedAllPage: boolean = false;
	isLoading: boolean = false;
	isLinear: boolean = true;
	BusinessUserByID: BusinessUserSimpleResponses = {} as BusinessUserSimpleResponses;
	currentBusinessUser: BusinessUserRequest = new BusinessUserRequest();
	currentProfileByID: ProfileSimpleResponses = {} as ProfileSimpleResponses;

	// realms: Realm[] = [];
	// businessUserRealmGroups: string[] = [];
	// realmGroups: RealmGroupSimpleResponse[] = [];
	profileList: ProfileSimpleResponses[] = [];
	bankList: BankSimpleResponse[] = [];
	bankGroupList: BankGroupSimpleResponse[] = [];

	pageListUser: BusinessUserPage[] = [];
	pageListUserSelect: BusinessUserPage[] = [];

	bankListUser: BusinessUserBank[] = [];
	bankListUserSelect: BusinessUserBank[] = [];

	bankGroupListUser: BusinessUserBankGroup[] = [];
	bankGroupListUserSelect: BusinessUserBankGroup[] = [];

	hide = signal(true);

	@ViewChild('matPaginatorPages') paginatorPages: any = MatPaginator;
	@ViewChild('sortPages') sortPages = new MatSort();

	displayedColumnsPages: string[] = [
		'index',
		'pageName',
		'businessUserCanCreate',
		'businessUserCanUpdate',
		'businessUserCanDelete',
		'select'
	];
	dataSourcePages!: MatTableDataSource<BusinessUserPage>;
	selectionPages = new SelectionModel<BusinessUserPage>(true, []);

	@ViewChild('matPaginatorBanks') paginatorBanks: any = MatPaginator;
	@ViewChild('sortBanks') sortBanks = new MatSort();

	displayedColumnsBanks: string[] = ['index', 'bankName', 'select'];
	dataSourceBanks!: MatTableDataSource<BusinessUserBank>;
	selectionBanks = new SelectionModel<BusinessUserBank>(true, []);

	@ViewChild('matPaginatorBankGroups') paginatorBankGroups: any = MatPaginator;
	@ViewChild('sortBankGroups') sortBankGroups = new MatSort();

	displayedColumnsBankGroups: string[] = ['index', 'bankGroupName', 'select'];
	dataSourceBankGroups!: MatTableDataSource<BusinessUserBankGroup>;
	selectionBankGroups = new SelectionModel<BusinessUserBankGroup>(true, []);

	ngOnInit() {
		this.businessUserID = this.activatedRoute.snapshot.params['id'];
		if (this.businessUserID != undefined && this.businessUserID != null) {
			this.getBusinessUser();
		} else {
			this.getAll();
		}
	}

	clickEventPwd(event: MouseEvent) {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}

	applyFilterPages(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourcePages.filter = filterValue.trim().toLowerCase();

		if (this.dataSourcePages.paginator) {
			this.dataSourcePages.paginator.firstPage();
		}
	}

	isAllSelectedPages() {
		const numSelected = this.selectionPages.selected.length;
		const numRows = this.dataSourcePages.data.length;
		return numSelected === numRows;
	}

	toggleAllRowsPages() {
		if (this.isAllSelectedPages()) {
			this.selectionPages.clear();
			return;
		}

		this.selectionPages.select(...this.dataSourcePages.data);
	}

	applyFilterBanks(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceBanks.filter = filterValue.trim().toLowerCase();

		if (this.dataSourceBanks.paginator) {
			this.dataSourceBanks.paginator.firstPage();
		}
	}

	isAllSelectedBanks() {
		const numSelected = this.selectionBanks.selected.length;
		const numRows = this.dataSourceBanks.data.length;
		return numSelected === numRows;
	}

	toggleAllRowsBanks() {
		if (this.isAllSelectedBanks()) {
			this.selectionBanks.clear();
			return;
		}

		this.selectionBanks.select(...this.dataSourceBanks.data);
	}

	applyFilterBankGroups(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceBankGroups.filter = filterValue.trim().toLowerCase();

		if (this.dataSourceBankGroups.paginator) {
			this.dataSourceBankGroups.paginator.firstPage();
		}
	}

	isAllSelectedBankGroups() {
		const numSelected = this.selectionBankGroups.selected.length;
		const numRows = this.dataSourceBankGroups.data.length;
		return numSelected === numRows;
	}

	toggleAllRowsBankGroups() {
		if (this.isAllSelectedBankGroups()) {
			this.selectionBankGroups.clear();
			return;
		}

		this.selectionBankGroups.select(...this.dataSourceBankGroups.data);
	}

	getAll() {
		const getAllServicesBU = forkJoin({
			bankAll: this.bankService.GetAll(),
			bankGroupAll: this.bankGroupService.GetAll(),
			profileAll: this.profileService.GetAll()
		});
		getAllServicesBU.subscribe({
			next: (response) => {
				this.bankList = response.bankAll;
				this.bankGroupList = response.bankGroupAll;
				this.profileList = response.profileAll;
			},
			error: (error) => {},
			complete: () => {
				this.loadPageProfile();
				this.loadBankUser();
				this.loadBankGroupUser();
				// setTimeout(() => {
				// 	this.loadBankUser();
				// }, 500);
			}
		});
	}

	getBusinessUser() {
		const getAllServicesBU = forkJoin({
			bankAll: this.bankService.GetAll(),
			bankGroupAll: this.bankGroupService.GetAll(),
			profileAll: this.profileService.GetAll(),
			userByID: this.businessUserService.GetById(this.businessUserID)
		});
		getAllServicesBU.subscribe({
			next: (response) => {
				this.bankList = response.bankAll;
				this.bankGroupList = response.bankGroupAll;
				this.profileList = response.profileAll;
				this.BusinessUserByID = response.userByID;

				this.currentBusinessUser.businessUserID = this.BusinessUserByID.businessUserID;
				this.currentBusinessUser.profileID = this.BusinessUserByID.profileID;
				this.currentBusinessUser.businessUserName = this.BusinessUserByID.businessUserName;
				this.currentBusinessUser.businessUserFirstName = this.BusinessUserByID.businessUserFirstName;
				this.currentBusinessUser.businessUserLastName = this.BusinessUserByID.businessUserLastName;
				this.currentBusinessUser.businessUserEmail = this.BusinessUserByID.businessUserEmail;
			},
			error: (error) => {},
			complete: () => {
				this.loadPageProfile();
				this.loadBankUser();
				this.loadBankGroupUser();
			}
		});
	}

	loadPageProfile() {
		if (this.currentBusinessUser.profileID !== null) {
			this.profileService.GetById(this.currentBusinessUser.profileID).subscribe((responseProfile) => {
				this.currentProfileByID = responseProfile;
				this.pageListUser = [];
				this.pageListUserSelect = [];
				this.currentProfileByID.profilePages.forEach((itemPage) => {
					let _page =
						this.BusinessUserByID.businessUserPages !== undefined
							? this.BusinessUserByID.businessUserPages.find((f) => f.pageID === itemPage.pageID)
							: undefined;
					let _item: BusinessUserPage = new BusinessUserPage();
					_item.businessUserPageID = _page !== undefined ? _page.businessUserPageID : Guid.EMPTY;
					_item.pageID = itemPage.pageID;
					_item.pageName = itemPage.pageName;
					_item.businessUserCanUpdate = _page !== undefined ? _page.businessUserCanUpdate : true;
					_item.businessUserCanCreate = _page !== undefined ? _page.businessUserCanCreate : true;
					_item.businessUserCanDelete = _page !== undefined ? _page.businessUserCanDelete : true;
					this.pageListUser.push(_item);
					if (_page !== undefined) this.pageListUserSelect.push(_item);
				});
				this.dataSourcePages = new MatTableDataSource(this.pageListUser);
				this.selectionPages.select(...this.pageListUserSelect);

				this.dataSourcePages.paginator = this.paginatorPages;
				this.dataSourcePages.sort = this.sortPages;
			});
		}
	}

	loadBankUser() {
		this.bankListUser = [];
		this.bankListUserSelect = [];

		this.bankList.forEach((itembank) => {
			let _bank =
				this.BusinessUserByID.businessUserBanks !== undefined
					? this.BusinessUserByID.businessUserBanks.find((f) => f.bankID === itembank.bankID)
					: undefined;

			let _item: BusinessUserBank = new BusinessUserBank();
			_item.businessUserBankID = _bank !== undefined ? _bank.businessUserBankID : Guid.EMPTY;
			_item.bankID = itembank.bankID;
			_item.bankName = itembank.bankName;
			this.bankListUser.push(_item);
			if (_bank !== undefined) this.bankListUserSelect.push(_item);
		});

		console.log('this.bankListUser', this.bankListUser);

		this.dataSourceBanks = new MatTableDataSource(this.bankListUser);
		this.selectionBanks.select(...this.bankListUserSelect);

		this.dataSourceBanks.paginator = this.paginatorBanks;
		this.dataSourceBanks.sort = this.sortBanks;
	}

	loadBankGroupUser() {
		this.bankGroupListUser = [];
		this.bankGroupListUserSelect = [];

		this.bankGroupList.forEach((itembank) => {
			let _bankGroup =
				this.BusinessUserByID.businessUserBankGroups !== undefined
					? this.BusinessUserByID.businessUserBankGroups.find((f) => f.bankGroupID === itembank.bankGroupID)
					: undefined;

			let _item: BusinessUserBankGroup = new BusinessUserBankGroup();
			_item.businessUserBankGroupID = _bankGroup !== undefined ? _bankGroup.businessUserBankGroupID : Guid.EMPTY;
			_item.bankGroupID = itembank.bankGroupID;
			_item.bankGroupName = itembank.bankGroupName;
			this.bankGroupListUser.push(_item);
			if (_bankGroup !== undefined) this.bankGroupListUserSelect.push(_item);
		});

		console.log('this.bankGroupListUser', this.bankGroupListUser);

		this.dataSourceBankGroups = new MatTableDataSource(this.bankGroupListUser);
		this.selectionBankGroups.select(...this.bankGroupListUserSelect);

		this.dataSourceBankGroups.paginator = this.paginatorBankGroups;
		this.dataSourceBankGroups.sort = this.sortBankGroups;
	}

	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/businessuser/list']);
	}

	@HostListener('window:keydown.alt.s', ['$event'])
	Save() {
		if (!this.selectionPages.isEmpty()) {
			this.currentBusinessUser.businessUserPages = [];
			this.selectionPages.selected.forEach((itemPage) => {
				let _item: BusinessUserPageRequest = new BusinessUserPageRequest();
				_item.businessUserPageID = itemPage.businessUserPageID;
				_item.PageID = itemPage.pageID;
				_item.businessUserPageCanCreate = itemPage.businessUserCanCreate;
				_item.businessUserPageCanUpdate = itemPage.businessUserCanUpdate;
				_item.businessUserPageCanDelete = itemPage.businessUserCanDelete;
				this.currentBusinessUser.businessUserPages.push(_item);
			});
		}

		if (!this.selectionBanks.isEmpty()) {
			this.currentBusinessUser.businessUserBanks = [];
			this.selectionBanks.selected.forEach((itemBank) => {
				let _item: BusinessUserBankRequest = new BusinessUserBankRequest();
				_item.businessUserBankID = itemBank.businessUserBankID;
				_item.bankID = itemBank.bankID;
				this.currentBusinessUser.businessUserBanks.push(_item);
			});
		}

		if (!this.selectionBankGroups.isEmpty()) {
			this.currentBusinessUser.businessUserBankGroups = [];
			this.selectionBankGroups.selected.forEach((itemBakGroup) => {
				let _item: BusinessUserBankGroupRequest = new BusinessUserBankGroupRequest();
				_item.bussinessUserBankGroupID = itemBakGroup.businessUserBankGroupID;
				_item.bankGroupId = itemBakGroup.bankGroupID;
				this.currentBusinessUser.businessUserBankGroups.push(_item);
			});
		}

		console.log('this.currentBusinessUser', this.currentBusinessUser);

		// this.BusinessUser.businessUserRealmGroups = this.businessUserRealmGroups.map((element) => {
		// 	return {
		// 		businessUserID: this.BusinessUser.realmID,
		// 		realmGroupID: element
		// 	};
		// });

		this.sweetAlertService.confirmBox('Are you sure you want to save the changes?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				if (this.businessUserID != undefined && this.businessUserID != null && this.businessUserID != '') {
					this.businessUserService.Update(this.currentBusinessUser).subscribe({
						next: (response) => {
							if (response.businessUserID !== '') {
								this.sweetAlertService.messageTextBox(
									`Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido actualizado correctamente`,
									true
								);
								this.getBusinessUser();
							}
						},
						error: (error) => {},
						complete: () => {}
					});
				} else {
					this.businessUserService.Create(this.currentBusinessUser).subscribe((response) => {
						if (response.businessUserID !== '') {
							this.sweetAlertService.messageTextBox(
								`Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido registrada correctamente`
							);
							this.getBusinessUser();
						}
					});
				}
			}
		});
	}

	Clean(): void {
		// this.BusinessUser = new BusinessUser();
	}

	// ChangeRealm(e: any) {
	// 	if (e) this.RealmGroupsByRealm(e.realmID);
	// 	else this.realmGroups = [];
	// }

	// RealmGroupsByRealm(realmID: string) {
	// 	this.realmGroupService.GetByFilter(realmID, '', '').subscribe((response) => {
	// 		this.realmGroups = response;
	// 	});
	// }
}
