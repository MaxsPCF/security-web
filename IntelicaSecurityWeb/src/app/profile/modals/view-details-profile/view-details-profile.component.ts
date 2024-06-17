import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageService } from '../../../page/page.service';
import { PageSimpleResponse } from '../../../page/dto/pageResponses';
import { ProfilePageSimpleResponses } from '../../dto/profileResponses';

@Component({
	selector: 'security-view-details-profile',
	standalone: true,
	imports: [],
	templateUrl: './view-details-profile.component.html',
	styleUrl: './view-details-profile.component.css'
})
export class ViewDetailsProfileComponent implements OnInit {
	@Input() listpage: ProfilePageSimpleResponses[] = [];

	public readonly activeModal = inject(NgbActiveModal);
	private readonly pageService = inject(PageService);

	pageListAll: PageSimpleResponse[] = [];

	ngOnInit(): void {
		this.pageService.GetAll().subscribe((response) => {
			if (response?.length > 0) {
				response.forEach((item) => {
					let _itemFind = this.listpage?.find((f) => f.pageID === item.pageId);
					if (_itemFind !== undefined) {
						this.pageListAll.push(item);
					}
				});
			}
		});
	}
}
