import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "./common/spinner/spinner.component";
import { filter, map } from "rxjs";
@Component({
	selector: "app-security",
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
	Title: string = "";
	private router = inject(Router);
	ngOnInit(): void {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => {
					let route: ActivatedRoute = this.router.routerState.root;
					let routeTitle = "";
					while (route!.firstChild) {
						route = route.firstChild;
					}
					if (route.snapshot.data["title"]) {
						routeTitle = route!.snapshot.data["title"];
					}
					return routeTitle;
				})
			)
			.subscribe((title: string) => {
				if (title) {
					this.Title = title;
				}
			});
	}
	title = "Intelica Security Web";
}
