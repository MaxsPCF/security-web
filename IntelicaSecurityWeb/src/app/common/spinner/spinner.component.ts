import { Component, inject } from "@angular/core";
import { SpinnerService } from "./spinner.service";
import { assetUrl } from "../../../single-spa/asset-url";
@Component({
	selector: "app-spinner",
	standalone: true,
	imports: [],
	templateUrl: "./spinner.component.html",
	styleUrl: "./spinner.component.css",
})
export class SpinnerComponent {
	private readonly spinerService = inject(SpinnerService);
	isLoading = this.spinerService.isLoading;
	LoadingLogo: string = assetUrl("images/loading_intelica.gif");
}
