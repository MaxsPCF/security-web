import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuOptionService } from '../menuoption.service';
import { MenuOptionParentResponses, MenuOptionSimpleResponses } from '../dto/menuOptionResponses';
import { MenuOptionFilter } from '../dto/menuOptionRequests';

@Component({
	selector: 'security-menuoptionlist',
	standalone: true,
	imports: [NgSelectModule, FormsModule, NgbPagination],
	templateUrl: './menuoptionlist.component.html',
	styleUrl: './menuoptionlist.component.css'
})
export class MenuoptionlistComponent {
	private readonly router = inject(Router);
	private readonly menuOptionService = inject(MenuOptionService);

	listMenuOption: MenuOptionSimpleResponses[] = [];
	listMenuParent: MenuOptionParentResponses[] = [];

	menuOptionModel: MenuOptionFilter = {} as MenuOptionFilter;

	ngOnInit(): void {
		this.menuOptionModel.menuOptionParentID = '';
		this.menuOptionModel.menuOptionName = '';

		this.GetAll();
	}

	GetAll() {
		const getAllServicesSF = forkJoin({
			parentAll: this.menuOptionService.GetMenuOptionParentAll(),
			menuAll: this.menuOptionService.GetByFilter('', '')
		});
		getAllServicesSF.subscribe({
			next: (response) => {
				this.listMenuParent = response.parentAll;
				this.listMenuOption = response.menuAll;
			},
			error: (error) => {},
			complete: () => {}
		});
	}

	Add() {
		this.router.navigate(['security/menuoption/maintenance']);
	}

	search() {
		this.menuOptionService.GetByFilter(this.menuOptionModel.menuOptionParentID, this.menuOptionModel.menuOptionName).subscribe((response) => {
			this.listMenuOption = response;
		});
	}
}
