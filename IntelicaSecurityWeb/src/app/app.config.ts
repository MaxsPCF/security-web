import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ConfigService, InitializeConfig } from "./common/config.service";
import { ErrorInterceptor } from "./common/error.interceptor";
export const appConfig: ApplicationConfig = {
	providers: [
		// ConfigService,
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: InitializeConfig,
		// 	multi: true,
		// 	deps: [ConfigService],
		// },
		// provideRouter(routes, withComponentInputBinding()),
		// provideClientHydration(),
		// provideAnimationsAsync(),
		// provideHttpClient(withFetch(), withInterceptors([ErrorInterceptor])),
	],
};
