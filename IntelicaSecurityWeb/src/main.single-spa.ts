import { APP_INITIALIZER, ApplicationConfig, enableProdMode, NgZone } from "@angular/core";
import { Router, NavigationStart, provideRouter, withComponentInputBinding } from "@angular/router";
import { singleSpaAngular, getSingleSpaExtraProviders } from "single-spa-angular";
import { singleSpaPropsSubject } from "./single-spa/single-spa-props";
import { APP_BASE_HREF } from "@angular/common";
import { bootstrapApplication, provideClientHydration } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { appConfig } from "./app/app.config";
import { ConfigService, InitializeConfig } from "./app/common/config.service";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ErrorInterceptor } from "./app/common/error.interceptor";

// if (environment.production) {enableProdMode();}
const lifecycles = singleSpaAngular({
	bootstrapFunction: singleSpaProps => {
		singleSpaPropsSubject.next(singleSpaProps);
		const options: ApplicationConfig = {
			//providers: [{ provide: APP_BASE_HREF, useValue: "/" }, getSingleSpaExtraProviders(), provideRouter(routes)],			
			providers: [
				//{ provide: APP_BASE_HREF, useValue: "/" },
				getSingleSpaExtraProviders(),
				 ConfigService,
				{
					provide: APP_INITIALIZER,
					useFactory: InitializeConfig,
					multi: true,
					deps: [ConfigService],
				},
				 provideRouter(routes, withComponentInputBinding()),
			//	provideClientHydration(),
				//provideAnimationsAsync(),
				 provideHttpClient(withFetch(), withInterceptors([ErrorInterceptor]))
			],
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
