import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "./environment";
@Injectable({ providedIn: "root" })
export class ConfigService  {
	environment?: environment;
	private readonly _http = inject(HttpClient);	
	async init() {
		this.environment = {
			"apiPath": "http://localhost:5180",
			"authServer": "http://localhost:8080",
			"authRealm": "IntelicaLocal",
			"authClientId": "security",
			"environment": "development"
		}
		//this.environment = await this._http.get<environment>("../../assets/environment.json").toPromise();
	}
}
export function InitializeConfig(confg: ConfigService) {
	return () => confg.init();
}