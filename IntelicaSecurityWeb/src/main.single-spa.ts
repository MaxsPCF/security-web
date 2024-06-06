import { ApplicationConfig, enableProdMode, NgZone } from "@angular/core";
import { Router, NavigationStart, provideRouter } from "@angular/router";
import { singleSpaAngular, getSingleSpaExtraProviders } from "single-spa-angular";
import { singleSpaPropsSubject } from "./single-spa/single-spa-props";
import { APP_BASE_HREF } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
// if (environment.production) {enableProdMode();}
const lifecycles = singleSpaAngular({
	bootstrapFunction: singleSpaProps => {
		singleSpaPropsSubject.next(singleSpaProps);
		const options: ApplicationConfig = {
			providers: [{ provide: APP_BASE_HREF, useValue: "/" }, getSingleSpaExtraProviders(), provideRouter(routes)],
		};
		return bootstrapApplication(AppComponent, options);
	},
	template: "<app-security />",
	Router,
	NavigationStart,
	NgZone,
});
export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;