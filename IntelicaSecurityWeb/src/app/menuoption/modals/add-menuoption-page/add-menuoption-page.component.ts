import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageService } from '../../../page/page.service';
import { PageSimpleResponse } from '../../../page/dto/pageResponses';

@Component({
	selector: 'security-add-menuoption-page',
	standalone: true,
	imports: [],
	templateUrl: './add-menuoption-page.component.html',
	styleUrl: './add-menuoption-page.component.css'
})
export class AddMenuoptionPageComponent implements OnInit {
	@Output() onAddPage = new EventEmitter<PageSimpleResponse>();

	public readonly activeModal = inject(NgbActiveModal);
	private readonly pageService = inject(PageService);

	pageListAll: PageSimpleResponse[] = [];

	ngOnInit(): void {
		this.pageService.GetAll().subscribe((response) => {
			this.pageListAll = response;
		});
	}

	AddPageMenuOption(row: PageSimpleResponse) {
		this.onAddPage.emit(row);
	}
}
