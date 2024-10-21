import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { NgbPagination, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { MenuOptionService } from "../menuoption.service";
import { MenuOptionParentResponses, MenuOptionSimpleResponses } from "../dto/menuOptionResponses";
import { MenuOptionFilter } from "../dto/menuOptionRequests";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
import { ActionDirective, ActionsMenuComponent } from "intelica-components-ui";
import { HtmlToExcel } from "../../common/HtmlToExcel";
@Component({
	selector: "security-menuoptionlist",
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination, ActionsMenuComponent, ActionDirective, NgbTooltipModule],
	templateUrl: "./menuoptionlist.component.html",
	styleUrl: "./menuoptionlist.component.css",
})
export class MenuoptionlistComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly menuOptionService = inject(MenuOptionService);
	private readonly sweetAlertService = inject(SweetAlertService);
	@ViewChild("actionsMenu") actionsMenu!: ActionsMenuComponent;

	listMenuOption: MenuOptionSimpleResponses[] = [];
	listMenuParent: MenuOptionParentResponses[] = [];
	menuOptionModel: MenuOptionFilter = {} as MenuOptionFilter;
	MenuOptionsFilter: MenuOptionSimpleResponses[] = [];
	MenuOptions: MenuOptionSimpleResponses[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	backBlueClass = false;
	ngOnInit(): void {
		this.menuOptionModel.menuOptionParentID = null;
		this.menuOptionModel.menuOptionName = "";
		this.GetAll();
		this.Search();
	}
	GetAll() {
		const getAllServicesSF = forkJoin({
			parentAll: this.menuOptionService.GetMenuOptionParentAll(),
			menuAll: this.menuOptionService.GetByFilter("", ""),
		});
		getAllServicesSF.subscribe({
			next: response => {
				this.listMenuParent = response.parentAll;
				this.listMenuOption = response.menuAll;
			},
			error: error => {},
			complete: () => {},
		});
	}
	Add() {
		this.router.navigate(["security/menuoption/maintenance"]);
	}
	Search() {
		this.menuOptionService.GetByFilter(this.menuOptionModel.menuOptionParentID, this.menuOptionModel.menuOptionName).subscribe(response => {
			this.MenuOptions = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	EditMenuOption(row: MenuOptionSimpleResponses) {
		this.router.navigate(["security/menuoption/maintenance"], {
			queryParams: { menuOptionID: row.menuOptionID },
		});
	}
	DeleteMenuOption(row: MenuOptionSimpleResponses) {
		this.sweetAlertService.confirmBox("Do you want to delete this menu option?", "Yes", "No").then(response => {
			if (response.isConfirmed) {
				this.menuOptionService.Delete(row.menuOptionID).subscribe({
					next: response => {
						if (response.menuOptionID !== "") {
							this.sweetAlertService.messageTextBox("Process successfully completed.");
							this.GetAll();
						}
					},
					error: error => {},
					complete: () => {},
				});
			}
		});
	}
	Export() {}
	RefreshList(): void {
		this.MenuOptionsFilter = this.MenuOptions.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
	applyFilter() {
		this.actionsMenu.closeAll();
		this.Search();
	}
	ClerSearch() {
		this.menuOptionModel = {} as MenuOptionFilter;
	}
	exportFilter() {
		this.actionsMenu.closeAll();
		this.Export();
	}
	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}
}
