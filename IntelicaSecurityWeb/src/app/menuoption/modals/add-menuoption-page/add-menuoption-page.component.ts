import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbPagination, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { PageService } from "../../../page/page.service";
import { PageSimpleResponse } from "../../../page/dto/pageResponses";
import { FormsModule } from "@angular/forms";
import { SharedService } from "../../../common/services/shared.service";

@Component({
	selector: "security-add-menuoption-page",
	standalone: true,
	imports: [NgbPagination, NgbTooltipModule, FormsModule],
	templateUrl: "./add-menuoption-page.component.html",
	styleUrl: "./add-menuoption-page.component.css",
})
export class AddMenuoptionPageComponent implements OnInit {
	@Output() onAddPage = new EventEmitter<PageSimpleResponse>();

	public readonly activeModal = inject(NgbActiveModal);
	private readonly pageService = inject(PageService);
	private readonly sharedService = inject(SharedService);

	Page: number = 1;
	PageSize: number = 10;
	PageLength: number = 0;
	textSearch: string = "";

	pageListAll: PageSimpleResponse[] = [];
	pageListTemp: PageSimpleResponse[] = [];
	pageListFilter: PageSimpleResponse[] = [];

	ngOnInit(): void {
		this.pageListAll = [];
		this.pageService.GetAll().subscribe(response => {
			response.forEach(item => {
				if (item.pageShowMenu) {
					this.pageListAll.push(item);
				}
			});

			this.pageListTemp = this.pageListAll;
			this.PageLength = this.pageListTemp.length;
			this.RefreshList();
		});
	}

	AddPageMenuOption(row: PageSimpleResponse) {
		this.onAddPage.emit(row);
	}

	RefreshList(): void {
		this.pageListFilter = this.pageListTemp.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}

	Search(): void {
		let searchText = this.textSearch?.trim()?.toLowerCase();
		let listFilter = [...this.pageListAll];
		console.log("searchText", searchText);
		this.pageListTemp = this.sharedService.getFilteredSearchKey(listFilter, "pageName", searchText, 0) ?? [];
		this.PageLength = this.pageListTemp.length;
		this.RefreshList();
	}
}
