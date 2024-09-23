import { Component, OnInit, inject, signal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "./common/spinner/spinner.component";
import { filter, fromEvent, map } from "rxjs";
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
	pageEvent = fromEvent(window, "CallEventChangePage");
	MenuUserID: string = "";
	private router = inject(Router);
	readonly featureFlagService = inject(CustomFeatureFlagService);
	async ngOnInit() {
		this.pageEvent.subscribe(async (x: any) => {
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
					if (pageInformation.pageTitle) this.Title = pageInformation.pageTitle;
					if (pageInformation.pageRoot) this.featureFlagService.Initialize(pageInformation.pageRoot);
					this.CallEventChangePage(pageInformation.pageTitle, "Security");
				});
		});
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