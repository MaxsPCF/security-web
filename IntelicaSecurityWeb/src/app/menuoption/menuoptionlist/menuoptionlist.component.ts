import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { MenuOptionService } from "../menuoption.service";
import { MenuOptionParentResponses, MenuOptionSimpleResponses } from "../dto/menuOptionResponses";
import { MenuOptionFilter } from "../dto/menuOptionRequests";
import { SweetAlertService } from "../../common/services/sweet-alert.service";
@Component({
	selector: "security-menuoptionlist",
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination],
	templateUrl: "./menuoptionlist.component.html",
	styleUrl: "./menuoptionlist.component.css",
})
export class MenuoptionlistComponent implements OnInit {
	listMenuOption: MenuOptionSimpleResponses[] = [];
	listMenuParent: MenuOptionParentResponses[] = [];
	menuOptionModel: MenuOptionFilter = {} as MenuOptionFilter;
	private readonly router = inject(Router);
	private readonly menuOptionService = inject(MenuOptionService);
	private readonly sweetAlertService = inject(SweetAlertService);
	ngOnInit(): void {
		this.menuOptionModel.menuOptionParentID = null;
		this.menuOptionModel.menuOptionName = "";
		this.GetAll();
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
			this.listMenuOption = response;
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
}