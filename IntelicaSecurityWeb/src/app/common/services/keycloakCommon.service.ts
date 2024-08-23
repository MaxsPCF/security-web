import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
@Injectable({ providedIn: 'root' })
export class CustomKeycloackService {
	private keycloakService?: KeycloakService;
	IsLoggedIn: boolean = false;
	Token: string = '';
	BusinessUserID: string = '';
	async init() {}
	async SetKeycloakInstance(keycloakService: KeycloakService) {
		this.keycloakService = keycloakService;
		this.Token = await this.keycloakService.getToken();
		this.IsLoggedIn = this.keycloakService.isLoggedIn();
		this.BusinessUserID = this.keycloakService.getKeycloakInstance().subject ?? '';
	}
}
export function InitializeConfig(confg: CustomKeycloackService) {
	return () => confg.init();
}
