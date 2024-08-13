import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { FeatureFlagService } from '../services/custom-feature-flag.service';

@Directive({
	selector: '[myRemoveIfFeatureOn]'
})
export class MyRemoveIfFeatureOnDirective implements OnInit {
	@Input('myRemoveIfFeatureOn') featureName!: string;
	private readonly featureFlagService = inject(FeatureFlagService);

	constructor(private el: ElementRef) {}

	ngOnInit() {
		this.featureFlagService.GetByFilter(this.featureName).subscribe((response) => {
			if (response.filter((x) => x.status).length > 0) {
				// this.el.nativeElement.parentNode.removeChild(this.el.nativeElement);
			}
		});
	}
}

function subscribe(arg0: (response: any) => void) {
	throw new Error('Function not implemented.');
}
