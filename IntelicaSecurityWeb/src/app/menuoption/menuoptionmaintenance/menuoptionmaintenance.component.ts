import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'security-menuoptionmaintenance',
	standalone: true,
	imports: [NgSelectModule, FormsModule],
	templateUrl: './menuoptionmaintenance.component.html',
	styleUrl: './menuoptionmaintenance.component.css'
})
export class MenuoptionmaintenanceComponent {
	private readonly router = inject(Router);

	listPage: any[] = [];

	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/menuoption/list']);
	}
}
