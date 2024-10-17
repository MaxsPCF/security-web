import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbPagination, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { PageService } from "../../../page/page.service";
import { PageSimpleResponse } from "../../../page/dto/pageResponses";

@Component({
	selector: "security-add-menuoption-page",
	standalone: true,
	imports: [NgbPagination, NgbTooltipModule],
	templateUrl: "./add-menuoption-page.component.html",
	styleUrl: "./add-menuoption-page.component.css",
})
export class AddMenuoptionPageComponent implements OnInit {
	@Output() onAddPage = new EventEmitter<PageSimpleResponse>();

	public readonly activeModal = inject(NgbActiveModal);
	private readonly pageService = inject(PageService);

	Page: number = 1;
	PageSize: number = 10;

	pageListAll: PageSimpleResponse[] = [];
	pageListFilter: PageSimpleResponse[] = [];

	ngOnInit(): void {
		this.pageListAll = [];
		this.pageService.GetAll().subscribe(response => {
			response.forEach(item => {
				if (item.pageShowMenu) this.pageListAll.push(item);
			});

			this.RefreshList();
		});
	}

	AddPageMenuOption(row: PageSimpleResponse) {
		this.onAddPage.emit(row);
	}

	RefreshList(): void {
		this.pageListFilter = this.pageListAll.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
