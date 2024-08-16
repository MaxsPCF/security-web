import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePageSimpleResponses } from '../../dto/profileResponses';

@Component({
	selector: 'security-view-details-profile',
	standalone: true,
	imports: [],
	templateUrl: './view-details-profile.component.html',
	styleUrl: './view-details-profile.component.css'
})
export class ViewDetailsProfileComponent {
	@Input() listpage: ProfilePageSimpleResponses[] = [];

	public readonly activeModal = inject(NgbActiveModal);
}
