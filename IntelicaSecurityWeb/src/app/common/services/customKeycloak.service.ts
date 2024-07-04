import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
@Injectable({ providedIn: "root" })
export class CustomKeycloackService {
	private keycloakService?: KeycloakService;
	IsLoggedIn: boolean = false;
	Token: string = "";
	async init() {}
	async SetKeycloakInstance(keycloakService: KeycloakService) {
		this.keycloakService = keycloakService;
		this.Token = await this.keycloakService.getToken();
		this.IsLoggedIn = this.keycloakService.isLoggedIn();
	}
}
export function InitializeConfig(confg: CustomKeycloackService) {
	return () => confg.init();
}