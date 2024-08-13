import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { filter, fromEvent, map } from 'rxjs';
import { CustomKeycloackService } from './common/services/customKeycloak.service';
@Component({
	selector: 'app-security',
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	Title: string = '';
	IsLoggedIn = signal<boolean>(false);
	CustomKeycloakService: CustomKeycloackService = inject(CustomKeycloackService);
	event = fromEvent(window, 'eventKeycloack');
	MenuUserID: string = '';

	private router = inject(Router);
	async ngOnInit() {
		//Route name

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let route: ActivatedRoute = this.router.routerState.root;
					let routeTitle = '';
					while (route!.firstChild) {
						route = route.firstChild;
					}
					if (route.snapshot.data['title']) {
						routeTitle = route!.snapshot.data['title'];
					}
					return routeTitle;
				})
			)
			.subscribe((title: string) => {
				if (title) {
					this.Title = title;
					var retrievedObject = localStorage.getItem('options');
					var currentMenu = JSON.parse(retrievedObject || '{}');
					this.RecusiveMenu(currentMenu);
					this.CallEventChangePage(title, 'Security');
				}
			});
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
		});
	}
	CallKeycloakInstance() {
		let event = new CustomEvent('callKeycloack', {
			detail: {
				callKeycloack: true
			}
		});

		window.dispatchEvent(event);
	}
	CallEventChangePage(title: string, client: string) {
		let event = new CustomEvent('eventChangePage', {
			detail: {
				title: title,
				client: client
			}
		});
		window.dispatchEvent(event);
	}
	title = 'Intelica Security Web';

	RecusiveMenu(currentMenu: []) {
		var urlMenu = window.location.pathname;
		for (var i = 0, len = currentMenu.length; i < len; i++) {
			let item: any = currentMenu[i];
			if (item.url == urlMenu) {
				this.MenuUserID = item.menuID;
				localStorage.setItem('MenuUserID', this.MenuUserID);
				break;
			} else {
				if (item.subMenuOptions !== null && item.subMenuOptions !== undefined && item.subMenuOptions.length > 0) {
					this.RecusiveMenu(item.subMenuOptions);
				}
			}
		}
	}
}
