import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuOptionService } from '../menuoption.service';
import { forkJoin } from 'rxjs';
import { MenuOptionParentResponses, MenuOptionSimpleResponses } from '../dto/menuOptionResponses';
import { MenuOptionCommands, MenuOptionPageCommands } from '../dto/menuOptionRequests';
import { SweetAlertService } from '../../common/services/sweet-alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMenuoptionPageComponent } from '../modals/add-menuoption-page/add-menuoption-page.component';
import { PageSimpleResponse } from '../../page/dto/pageResponses';

@Component({
	selector: 'security-menuoptionmaintenance',
	standalone: true,
	imports: [NgSelectModule, FormsModule],
	templateUrl: './menuoptionmaintenance.component.html',
	styleUrl: './menuoptionmaintenance.component.css'
})
export class MenuoptionmaintenanceComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly menuOptionService = inject(MenuOptionService);
	private readonly sweetAlertService = inject(SweetAlertService);
	private readonly modalService = inject(NgbModal);
	private readonly ngActivatedRoute = inject(ActivatedRoute);

	@ViewChild('MenuOptionForm', { read: NgForm }) MenuOptionForm: any;

	menuOptionCurrent: MenuOptionCommands = new MenuOptionCommands();
	listMenuParent: MenuOptionParentResponses[] = [];
	listPage: any[] = [];
	swEdit: Boolean = false;
	parameters: Params | undefined = undefined;
	menuOptionID: string = '';

	currentFilter: MenuOptionSimpleResponses = {} as MenuOptionSimpleResponses;

	ngOnInit(): void {
		this.ngActivatedRoute.queryParams.subscribe((parameters) => {
			this.parameters = parameters;
			this.menuOptionID = this.parameters['menuOptionID'];
			if (this.menuOptionID !== '' && this.menuOptionID !== undefined) {
				this.swEdit = true;
				this.getMenuOption();
			} else {
				this.getAll();
			}
		});
	}

	getAll() {
		this.menuOptionService.GetMenuOptionParentAll().subscribe((response) => {
			this.listMenuParent = response;
		});
	}

	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/menuoption/list']);
	}

	@HostListener('window:keydown.alt.s', ['$event'])
	save() {
		// if (!this.MenuOptionForm.valid) {		// 	// Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
		// 	return;
		// }
		// console.log('this.menuOptionCurrent', this.menuOptionCurrent);

		const swError = this.validateCreate(this.menuOptionCurrent);
		if (swError) {
			this.sweetAlertService.messageTextBox('Please complete all mandatory fields or correct wrong values to continue.');
			return;
		}

		this.sweetAlertService.confirmBox('Are you sure you want to save the changes?', 'Yes', 'No').then((response) => {
			if (response.isConfirmed) {
				if (!this.swEdit) {
					this.menuOptionService.Create(this.menuOptionCurrent).subscribe({
						next: (response) => {
							if (response.menuOptionID !== '') {
								this.sweetAlertService.messageTextBox('Process successfully completed.');
								this.menuOptionID = response.menuOptionID;
								this.swEdit = true;
								this.getMenuOption();
							}
						},
						error: (error) => {},
						complete: () => {}
					});
				} else {
					this.menuOptionService.Update(this.menuOptionCurrent).subscribe((response) => {
						if (response.menuOptionID !== '') {
							this.sweetAlertService.messageTextBox('Process successfully completed.');
							this.menuOptionID = response.menuOptionID;
							this.swEdit = true;
							this.getMenuOption();
						}
					});
				}
			}
		});
	}

	validateCreate(param: MenuOptionCommands): boolean {
		let parameter = param;
		let swValidate: boolean = false;
		if (this.swEdit) {
			if (parameter.menuOptionID?.trim() === '') swValidate = true;
		}
		if (parameter.menuOptionName?.trim() === '') swValidate = true;
		if (parameter.menuOptionDescription?.trim() === '') swValidate = true;

		return swValidate;
	}

	addPageMenuOption() {
		const modal = this.modalService.open(AddMenuoptionPageComponent, { size: 'md' });
		modal.componentInstance.onAddPage.subscribe({
			next: (newPage: PageSimpleResponse) => {
				let swPageExists: boolean = false;
				this.menuOptionCurrent.menuOptionPages.forEach((page) => {
					if (page.pageID === newPage.pageId) {
						swPageExists = true;
						return;
					}
				});

				if (swPageExists) {
					this.sweetAlertService.messageTextBox('Page exists in list.');
					return;
				} else {
					let _page: MenuOptionPageCommands = new MenuOptionPageCommands();
					_page.pageID = newPage.pageId;
					_page.pageName = newPage.pageName;

					this.menuOptionCurrent.menuOptionPages.push(_page);
				}
			}
		});
	}

	getMenuOption() {
		const getAllServicesSF = forkJoin({
			parentAll: this.menuOptionService.GetMenuOptionParentAll(),
			menuOption: this.menuOptionService.GetById(this.menuOptionID)
		});
		getAllServicesSF.subscribe({
			next: (response) => {
				this.listMenuParent = response.parentAll;
				this.currentFilter = response.menuOption;

				this.menuOptionCurrent = new MenuOptionCommands();
				this.menuOptionCurrent.menuOptionID = this.currentFilter.menuOptionID;
				this.menuOptionCurrent.menuOptionParentID = this.currentFilter.menuOptionParentID;
				this.menuOptionCurrent.menuOptionName = this.currentFilter.menuOptionName;
				this.menuOptionCurrent.menuOptionDescription = this.currentFilter.menuOptionDescription;
				this.menuOptionCurrent.menuOptionOrder = this.currentFilter.menuOptionOrder;
				this.menuOptionCurrent.menuOptionIcon = this.currentFilter.menuOptionIcon;
				this.menuOptionCurrent.menuOptionShow = this.currentFilter.menuOptionShow;
				this.menuOptionCurrent.menuOptionPages = [];

				this.currentFilter.menuOptionPages.forEach((itemPage) => {
					let _page: MenuOptionPageCommands = new MenuOptionPageCommands();
					_page.menuOptionPageID = itemPage.menuOptionPageID;
					_page.menuOptionID = itemPage.menuOptionID;
					_page.pageID = itemPage.pageID;
					_page.pageName = itemPage.pageName;
					_page.menuOptionPageOrder = itemPage.menuOptionPageOrder;
					this.menuOptionCurrent.menuOptionPages.push(_page);
				});
			},
			error: (error) => {},
			complete: () => {}
		});
	}

	deleteItemPage(index: number) {
		this.menuOptionCurrent.menuOptionPages.splice(index, 1);
	}

	cleanFrmMenuOption() {
		if (this.menuOptionID !== '' && this.menuOptionID !== undefined) {
			this.swEdit = true;
			this.getMenuOption();
		} else {
			this.getAll();
		}
	}
}
