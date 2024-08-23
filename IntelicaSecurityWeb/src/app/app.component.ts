import { Component, OnInit, inject, signal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "./common/spinner/spinner.component";
import { filter, fromEvent, map } from "rxjs";
import { CustomKeycloackService } from "./common/services/keycloakCommon.service";
import CustomFeatureFlagService from "./common/services/featureFlagCommon.service";
@Component({
	selector: "app-security",
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
	Title: string = "";
	IsLoggedIn = signal<boolean>(false);
	CustomKeycloakService: CustomKeycloackService = inject(CustomKeycloackService);
	event = fromEvent(window, "eventKeycloack");
	MenuUserID: string = "";
	private router = inject(Router);
	readonly featureFlagService = inject(CustomFeatureFlagService);
	async ngOnInit() {
		//Keycloak
		var intertval = setInterval(async () => {
			if (this.IsLoggedIn()) clearInterval(intertval);
			else this.CallKeycloakInstance();
		}, 300);
		this.SetKeycloakInstance();
	}
	async SetKeycloakInstance() {
		this.event.subscribe(async (x: any) => {
			this.CustomKeycloakService.SetKeycloakInstance(x.detail.keycLoakService);
			this.IsLoggedIn.set(true);
			//Route name
			this.router.events
				.pipe(
					filter(event => event instanceof NavigationEnd),
					map(() => {
						let route: ActivatedRoute = this.router.routerState.root;
						while (route!.firstChild) {
							route = route.firstChild;
						}
						return new PageInformation(route!.snapshot.data["title"], route!.snapshot.data["pageRoot"]);
					})
				)
				.subscribe((pageInformation: PageInformation) => {
					console.log(pageInformation, "pageInformation");
					if (pageInformation.pageTitle) this.Title = pageInformation.pageTitle;
					if (pageInformation.pageRoot) this.featureFlagService.Initialize(pageInformation.pageRoot);
				});
		});
	}
	CallKeycloakInstance() {
		let event = new CustomEvent("callKeycloack", {
			detail: {
				callKeycloack: true,
			},
		});
		window.dispatchEvent(event);
	}
	CallEventChangePage(title: string, client: string) {
		let event = new CustomEvent("eventChangePage", {
			detail: {
				title: title,
				client: client,
			},
		});
		window.dispatchEvent(event);
	}
}
export class PageInformation {
	pageTitle: string;
	pageRoot: string;
	constructor(pageTitle: string, pageRoot: string) {
		this.pageTitle = pageTitle;
		this.pageRoot = pageRoot;
	}
}
