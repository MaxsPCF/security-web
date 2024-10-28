import CustomFeatureFlagService from "./common/services/featureFlagCommon.service";
import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "./common/spinner/spinner.component";
import { filter, fromEvent, map } from "rxjs";
import { TermService } from "./common/services/term.service";
import { getCookie } from "typescript-cookie";
import { assetUrl } from "../single-spa/asset-url";
@Component({
	selector: "app-security",
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: "./app.component.html",
})
export class AppComponent  {
	Title: string = "";
	pageEvent = fromEvent(window, "CallEventChangePage");
	MenuUserID: string = "";
	PageRoot: string = "";
	LoadingLogo: string = assetUrl("loading_intelica.gif");
	TermsIsReady = signal<boolean>(false);
	private router = inject(Router);
	private TermService = inject(TermService);
	readonly featureFlagService = inject(CustomFeatureFlagService);
	constructor() {
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
				this.TermsIsReady.set(false);
				if (pageInformation.pageTitle) this.Title = pageInformation.pageTitle;
				if (pageInformation.pageRoot) {
					this.PageRoot = pageInformation.pageRoot;
					this.featureFlagService.Initialize(pageInformation.pageRoot);
				}
				if (sessionStorage.getItem("PageRoot") != pageInformation.pageRoot) this.LoadTerms();
				else this.TermsIsReady.set(true);
				this.CallEventChangePage(pageInformation.pageTitle, "Security");
			});
		this.CallbackChangeLanguage();
	}
	async LoadTerms() {
		sessionStorage.setItem("PageRoot", this.PageRoot);
		this.TermService.GetPageTerm(getCookie("language") ?? "EN", this.PageRoot).subscribe(response => {
			sessionStorage.setItem("Term", JSON.stringify(response));
			this.TermsIsReady.set(true);
		});
	}
	async ChangeLanguage() {
		while (true) {
			await sleep(10);
			if (document.querySelectorAll("[data-security]").length > 0) break;
		}
		sessionStorage.setItem("PageRoot", this.PageRoot);
		this.TermService.GetPageTerm(getCookie("language") ?? "EN", this.PageRoot).subscribe(response => {
			this.TermsIsReady.set(true);
			sessionStorage.setItem("Term", JSON.stringify(response));
			const textsToChange = document.querySelectorAll("[data-security]");
			textsToChange.forEach(async element => {
				let dataValue = element.getAttribute("data-security");
				let newText = response.find(x => x.termName == dataValue)?.termValue ?? "";
				element.innerHTML = newText;
				element.setAttribute("placeholder", newText);
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
	CallbackChangeLanguage() {
		var event = fromEvent(window, "ChangeLanguage");
		event.subscribe(async (x: any) => {
			this.ChangeLanguage();
		});
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
function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
