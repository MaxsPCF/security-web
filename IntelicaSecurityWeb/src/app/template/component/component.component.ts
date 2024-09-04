import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTableComponent, NewFilterComponent, ActionsMenuComponent, ActionDirective } from 'intelica-components-ui';
import Swal from 'sweetalert2';

@Component({
	selector: 'security-component',
	standalone: true,
	imports: [CommonModule, NewTableComponent, NewFilterComponent, ActionsMenuComponent, ActionDirective],
	templateUrl: './component.component.html',
	styleUrl: './component.component.css'
})
export class ComponentComponent {
	backBlueClass = false;
	showBackBlue(value: boolean): void {
		this.backBlueClass = value;
	}

	laodmsj() {
		Swal.fire('Se realizo la exportación corectamente', 'success');
		return false;
	}
}
