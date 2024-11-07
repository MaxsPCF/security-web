import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProfileSimpleResponses } from "../../profile/dto/profileResponses";
import { ProfileService } from "../../profile/profile.service";
import { BusinessuserService } from "../businessuser.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BusinessUserBank, BusinessUserBankGroup, BusinessUserPage, BusinessUserResponse } from "../dto/businessUserResponses";
import { AsyncSubject, forkJoin, Observable } from "rxjs";
import { BusinessUserRequest } from "../dto/businessUser";
import { BankSimpleResponse } from "../../bank/dto/bankResponses";
import { BankGroupSimpleResponse } from "../../bankgroup/dto/bankGroupResponses";
import { BankGroupService } from "../../bankgroup/bankgroup.service";
import { BankService } from "../../bank/bank.service";
import { Guid } from "guid-typescript";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
import { BusinessUserPageRequest } from "../dto/businessUserPage";
import { BusinessUserBankRequest } from "../dto/businessUserBank";
import { BusinessUserBankGroupRequest } from "../dto/businessUserBankGroup";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import CommonFeatureFlagService from "../../common/services/featureFlagCommon.service";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ConfigService } from "../../common/services/config.service";
@Component({
	selector: "security-businessusermaintenance",
	standalone: true,
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
	imports: [
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
		MatPaginatorModule,
		ReactiveFormsModule,
	],
	templateUrl: "./businessusermaintenance.component.html",
	styleUrl: "./businessusermaintenance.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessusermaintenanceComponent implements OnInit {
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly bankService = inject(BankService);
	private readonly bankGroupService = inject(BankGroupService);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly connection: HubConnection;
	private readonly ConfigService = inject(ConfigService);
	readonly featureFlagService = inject(CommonFeatureFlagService);
	businessUserID: string = "";
	Read: boolean = false;
	isLoading: boolean = false;
	isLinear: boolean = true;
	BusinessUserByID: BusinessUserResponse = {} as BusinessUserResponse;
	currentBusinessUser: BusinessUserRequest = new BusinessUserRequest();
	currentProfileByID: ProfileSimpleResponses = {} as ProfileSimpleResponses;
	profileList: ProfileSimpleResponses[] = [];
	bankList: BankSimpleResponse[] = [];
	bankGroupList: BankGroupSimpleResponse[] = [];
	selectedFiles: SelectedFiles[] = [];
	pageListUser: BusinessUserPage[] = [];
	pageListUserSelect: BusinessUserPage[] = [];
	bankListUser: BusinessUserBank[] = [];
	bankListUserSelect: BusinessUserBank[] = [];
	bankGroupListUser: BusinessUserBankGroup[] = [];
	bankGroupListUserSelect: BusinessUserBankGroup[] = [];
	displayedColumnsPages: string[] = ["index", "pageName", "businessUserCanCreate", "businessUserCanUpdate", "businessUserCanDelete", "select"];
	dataSourcePages!: MatTableDataSource<BusinessUserPage>;
	selectionPages = new SelectionModel<BusinessUserPage>(true, []);
	displayedColumnsBanks: string[] = ["index", "bankName", "select"];
	dataSourceBanks!: MatTableDataSource<BusinessUserBank>;
	selectionBanks = new SelectionModel<BusinessUserBank>(true, []);
	displayedColumnsBankGroups: string[] = ["index", "bankGroupName", "select"];
	dataSourceBankGroups!: MatTableDataSource<BusinessUserBankGroup>;
	selectionBankGroups = new SelectionModel<BusinessUserBankGroup>(true, []);
	hide = signal(true);
	@ViewChild("matPaginatorPages") paginatorPages!: MatPaginator;
	@ViewChild("sortPages") sortPages!: MatSort;
	@ViewChild("matPaginatorBanks") set matPaginatorBanks(paginator: MatPaginator) {
		if (this.dataSourceBanks !== undefined) this.dataSourceBanks.paginator = paginator;
	}
	@ViewChild("sortBanks") set sortBanks(sort: MatSort) {
		if (this.dataSourceBanks !== undefined) this.dataSourceBanks.sort = sort;
	}
	@ViewChild("matPaginatorBankGroups") set matPaginatorBankGroups(paginator: MatPaginator) {
		if (this.dataSourceBankGroups !== undefined) this.dataSourceBankGroups.paginator = paginator;
	}
	@ViewChild("sortBankGroups") set sortBankGroups(sort: MatSort) {
		if (this.dataSourceBankGroups !== undefined) this.dataSourceBankGroups.sort = sort;
	}
	constructor() {
		this.connection = new HubConnectionBuilder().withUrl(`${this.ConfigService.environment?.hubPath}/featureflag`).withAutomaticReconnect().build();
		this.connection.on("Refresh", () =>{
			console.log("Method refresh send");
			this.featureFlagService.Refresh();
		} );
		this.connection.on("Connect", message => console.log(message));
		this.connection
			.start()
			.then(_ => {
				this.connection.invoke("Connect", this.featureFlagService.GetPageRoot());
			})
			.catch(error => {
				return console.error(error);
			});
	}
	ngOnInit() {
		this.onInitForm();
		this.businessUserID = this.activatedRoute.snapshot.params["id"];
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
			profileAll: this.profileService.GetAll(),
		});
		getAllServicesBU.subscribe({
			next: response => {
				this.bankList = response.bankAll;
				this.bankGroupList = response.bankGroupAll;
				this.profileList = response.profileAll;
			},
			error: error => {},
			complete: () => {
				this.loadPageProfile();
				this.loadBankUser();
				this.loadBankGroupUser();
			},
		});
	}
	getBusinessUser() {
		const getAllServicesBU = forkJoin({
			bankAll: this.bankService.GetAll(),
			bankGroupAll: this.bankGroupService.GetAll(),
			profileAll: this.profileService.GetAll(),
			userByID: this.businessUserService.GetById(this.businessUserID),
		});
		getAllServicesBU.subscribe({
			next: response => {
				this.bankList = response.bankAll;
				this.bankGroupList = response.bankGroupAll;
				this.profileList = response.profileAll;
				this.BusinessUserByID = response.userByID;

				this.currentBusinessUser.businessUserID = this.BusinessUserByID.businessUserID;
				this.firstFormGroup.controls["profileID"].setValue(this.BusinessUserByID.profileID);
				this.firstFormGroup.controls["businessUserName"].setValue(this.BusinessUserByID.businessUserName);
				this.firstFormGroup.controls["businessUserFirstName"].setValue(this.BusinessUserByID.businessUserFirstName);
				this.firstFormGroup.controls["businessUserLastName"].setValue(this.BusinessUserByID.businessUserLastName);
				this.firstFormGroup.controls["businessUserEmail"].setValue(this.BusinessUserByID.businessUserEmail);
				this.firstFormGroup.controls["businessUserPassword"].setValue(this.BusinessUserByID.businessUserPassword);

				if (this.BusinessUserByID.businessUserPhoto !== "") {
					this.imagePreview.set(("data:image/jpeg;base64," + this.BusinessUserByID.businessUserPhoto) as string);
					this.imageName.set("");
				}
			},
			error: error => {},
			complete: () => {
				this.loadPageProfile();
				this.loadBankUser();
				this.loadBankGroupUser();
			},
		});
	}
	loadPageProfile() {
		this.currentBusinessUser.profileID = this.firstFormGroup.controls["profileID"].value;
		if (this.currentBusinessUser.profileID !== null) {
			this.profileService.GetById(this.currentBusinessUser.profileID).subscribe(responseProfile => {
				this.currentProfileByID = responseProfile;
				this.pageListUser = [];
				this.pageListUserSelect = [];
				if (this.currentProfileByID.profilePages !== undefined) {
					this.currentProfileByID.profilePages.forEach(itemPage => {
						let _page = this.BusinessUserByID.businessUserPages !== undefined ? this.BusinessUserByID.businessUserPages.find(f => f.pageID === itemPage.pageID) : undefined;
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
				}
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
		this.bankList.forEach(itembank => {
			let _bank = this.BusinessUserByID.businessUserBanks !== undefined ? this.BusinessUserByID.businessUserBanks.find(f => f.bankID === itembank.bankID) : undefined;
			let _item: BusinessUserBank = new BusinessUserBank();
			_item.businessUserBankID = _bank !== undefined ? _bank.businessUserBankID : Guid.EMPTY;
			_item.bankID = itembank.bankID;
			_item.bankName = itembank.bankName;
			this.bankListUser.push(_item);
			if (_bank !== undefined) this.bankListUserSelect.push(_item);
		});
		this.dataSourceBanks = new MatTableDataSource(this.bankListUser);
		this.selectionBanks.select(...this.bankListUserSelect);
	}
	loadBankGroupUser() {
		this.bankGroupListUser = [];
		this.bankGroupListUserSelect = [];
		this.bankGroupList.forEach(itembank => {
			let _bankGroup = this.BusinessUserByID.businessUserBankGroups !== undefined ? this.BusinessUserByID.businessUserBankGroups.find(f => f.bankGroupID === itembank.bankGroupID) : undefined;
			let _item: BusinessUserBankGroup = new BusinessUserBankGroup();
			_item.businessUserBankGroupID = _bankGroup !== undefined ? _bankGroup.businessUserBankGroupID : Guid.EMPTY;
			_item.bankGroupID = itembank.bankGroupID;
			_item.bankGroupName = itembank.bankGroupName;
			this.bankGroupListUser.push(_item);
			if (_bankGroup !== undefined) this.bankGroupListUserSelect.push(_item);
		});
		this.dataSourceBankGroups = new MatTableDataSource(this.bankGroupListUser);
		this.selectionBankGroups.select(...this.bankGroupListUserSelect);
	}
	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/businessuser/list"]);
	}
	@HostListener("window:keydown.alt.c", ["$event"])
	Clean(): void {
		if (this.businessUserID != undefined && this.businessUserID != null) {
			this.getBusinessUser();
		} else {
			this.currentBusinessUser = new BusinessUserRequest();
		}
	}
	firstFormGroup!: FormGroup;
	emailPattern: any = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
	//Acepta letras, números y guiones. Mínimo 5 y máximo 20.
	lettersPattern: any = /^[a-z0-9_-]{5,20}$/;
	//Al menos debe contener una mayúscula, una minúscula, un número y un caracter especial. Mínimo 8.
	passwordPattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
	onInitForm() {
		this.firstFormGroup = this._formBuilder.group({
			profileID: new FormControl("", [Validators.required]),
			businessUserName: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(this.lettersPattern)]),
			businessUserFirstName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
			businessUserLastName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
			businessUserEmail: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
			businessUserPassword: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
		});
	}
	get frm1(): { [key: string]: AbstractControl } {
		return this.firstFormGroup.controls;
	}
	@HostListener("window:keydown.alt.s", ["$event"])
	Save() {
		if (this.firstFormGroup.invalid) {
			this.sweetAlertService.messageTextBox("Complete the required fields.");
			return;
		}
		if (this.BusinessUserByID.businessUserID !== Guid.EMPTY) {
			this.currentBusinessUser.businessUserID = this.BusinessUserByID.businessUserID;
		}
		this.currentBusinessUser.profileID = this.firstFormGroup.controls["profileID"].value;
		this.currentBusinessUser.businessUserName = this.firstFormGroup.controls["businessUserName"].value;
		this.currentBusinessUser.businessUserFirstName = this.firstFormGroup.controls["businessUserFirstName"].value;
		this.currentBusinessUser.businessUserLastName = this.firstFormGroup.controls["businessUserLastName"].value;
		this.currentBusinessUser.businessUserEmail = this.firstFormGroup.controls["businessUserEmail"].value;
		this.currentBusinessUser.businessUserPassword = this.firstFormGroup.controls["businessUserPassword"].value;
		if (!this.selectionPages.isEmpty()) {
			this.currentBusinessUser.businessUserPages = [];
			this.selectionPages.selected.forEach(itemPage => {
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
			this.selectionBanks.selected.forEach(itemBank => {
				let _item: BusinessUserBankRequest = new BusinessUserBankRequest();
				_item.businessUserBankID = itemBank.businessUserBankID;
				_item.bankID = itemBank.bankID;
				this.currentBusinessUser.businessUserBanks.push(_item);
			});
		}
		if (!this.selectionBankGroups.isEmpty()) {
			this.currentBusinessUser.businessUserBankGroups = [];
			this.selectionBankGroups.selected.forEach(itemBakGroup => {
				let _item: BusinessUserBankGroupRequest = new BusinessUserBankGroupRequest();
				_item.bussinessUserBankGroupID = itemBakGroup.businessUserBankGroupID;
				_item.bankGroupId = itemBakGroup.bankGroupID;
				this.currentBusinessUser.businessUserBankGroups.push(_item);
			});
		}
		const swError = this.validateFormField(this.currentBusinessUser);
		if (swError) {
			this.sweetAlertService.messageTextBox("Please complete all mandatory fields or correct wrong values to continue.");
			return;
		}
		this.sweetAlertService.confirmBox("Are you sure you want to save the changes?", "Yes", "No").then(response => {
			if (response.isConfirmed) {
				if (this.businessUserID != undefined && this.businessUserID != null && this.businessUserID != "") {
					this.businessUserService.Update(this.currentBusinessUser).subscribe({
						next: response => {
							if (response.businessUserID !== "") {
								this.sweetAlertService.messageTextBox(`Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido actualizado correctamente`, true);
								this.getBusinessUser();
							}
						},
						error: error => {},
						complete: () => {},
					});
				} else {
					this.businessUserService.Create(this.currentBusinessUser).subscribe(response => {
						if (response.businessUserID !== "") {
							this.sweetAlertService.messageTextBox(`Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido registrada correctamente`, true);
							this.businessUserID = response.businessUserID;
							this.getBusinessUser();
						}
					});
				}
			}
		});
	}
	validateFormField(param: BusinessUserRequest): boolean {
		let parameter = param;
		let swValidate: boolean = false;
		if (this.businessUserID != undefined && this.businessUserID != null && this.businessUserID != "") {
			if (parameter.businessUserID?.trim() === "") swValidate = true;
		}
		if (parameter.businessUserName?.trim() === "") {
			this.firstFormGroup.controls["businessUserName"].setValue("");
			swValidate = true;
		}
		if (parameter.businessUserFirstName?.trim() === "") {
			this.firstFormGroup.controls["businessUserFirstName"].setValue("");
			swValidate = true;
		}
		if (parameter.businessUserLastName?.trim() === "") {
			this.firstFormGroup.controls["businessUserLastName"].setValue("");
			swValidate = true;
		}
		if (parameter.businessUserEmail?.trim() === "") {
			this.firstFormGroup.controls["businessUserEmail"].setValue("");
			swValidate = true;
		}
		if (parameter.businessUserPassword?.trim() === "") {
			this.firstFormGroup.controls["businessUserPassword"].setValue("");
			swValidate = true;
		}
		return swValidate;
	}
	imageName = signal("");
	imagePreview = signal("");
	@ViewChild("fileInput") fileInput: ElementRef | undefined;
	public onFileSelected(event: any) {
		const files = event.target.files;
		this.toFilesBase64(files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
			this.selectedFiles = res;
			this.imagePreview.set(this.selectedFiles[0].base64 as string);
			this.imageName.set(this.selectedFiles[0].name);

			if (this.selectedFiles[0].base64 !== undefined) {
				const base64String = this.selectedFiles[0].base64.replace("data:", "").replace(/^.+,/, "");
				this.currentBusinessUser.businessUserPhoto = base64String;
			}
		});
	}
	public toFilesBase64(files: File[], selectedFiles: SelectedFiles[]): Observable<SelectedFiles[]> {
		const result = new AsyncSubject<SelectedFiles[]>();
		if (files?.length) {
			Object.keys(files)?.forEach(async (file, i) => {
				const reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = e => {
					selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name);
					selectedFiles.push({ name: files[i]?.name, file: files[i], base64: reader?.result as string });
					result.next(selectedFiles);
					if (files?.length === i + 1) {
						result.complete();
					}
				};
			});
			return result;
		} else {
			result.next([]);
			result.complete();
			return result;
		}
	}
	removeImage(): void {
		this.imageName.set("");
		this.imagePreview.set("");
	}
}
export interface SelectedFiles {
	name: string;
	file: any;
	base64?: string;
}
