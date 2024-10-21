import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfilePageSimpleResponses } from "../../dto/profileResponses";

@Component({
	selector: "security-view-details-profile",
	standalone: true,
	imports: [NgbPaginationModule],
	templateUrl: "./view-details-profile.component.html",
	styleUrl: "./view-details-profile.component.css",
})
export class ViewDetailsProfileComponent {
	public readonly activeModal = inject(NgbActiveModal);

	@Input() listpage: ProfilePageSimpleResponses[] = [];
	pageListFilter: ProfilePageSimpleResponses[] = [];

	Page: number = 1;
	PageSize: number = 10;

	ngOnInit(): void {
		this.RefreshList();
	}

	RefreshList() {
		this.pageListFilter = this.listpage.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
