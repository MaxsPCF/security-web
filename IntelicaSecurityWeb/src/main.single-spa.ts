import { APP_INITIALIZER, ApplicationConfig, enableProdMode, NgZone } from '@angular/core';
import { Router, NavigationStart, provideRouter, withComponentInputBinding } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ConfigService, InitializeConfig } from './app/common/services/config.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './app/common/error.interceptor';
import { CustomKeycloackService } from './app/common/services/customKeycloak.service';
import "@angular/localize/init";
enableProdMode()
const lifecycles = singleSpaAngular({
	bootstrapFunction: (singleSpaProps) => {
		singleSpaPropsSubject.next(singleSpaProps);
		const options: ApplicationConfig = {
			providers: [
				getSingleSpaExtraProviders(),
				ConfigService,
				{
					provide: APP_INITIALIZER,
					useFactory: InitializeConfig,
					multi: true,
					deps: [ConfigService]
				},
				provideRouter(routes, withComponentInputBinding()),
				CustomKeycloackService,
				{
					provide: APP_INITIALIZER,
					useFactory: InitializeConfig,
					multi: true,
					deps: [CustomKeycloackService]
				},
				provideClientHydration(),
				provideAnimationsAsync(),
				provideHttpClient(
					withFetch(),
					withInterceptors([ErrorInterceptor])
				)
			]
		};
		return bootstrapApplication(AppComponent, options);
	},
	template: '<app-security />',
	Router,
	NavigationStart,
	NgZone
});
export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;