import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTableComponent, NewFilterComponent } from 'intelicacomponents';

@Component({
	selector: 'security-component',
	standalone: true,
	imports: [CommonModule, NewTableComponent, NewFilterComponent],
	templateUrl: './component.component.html',
	styleUrl: './component.component.css'
})
export class ComponentComponent {}
