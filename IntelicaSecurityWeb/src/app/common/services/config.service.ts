import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { assetUrl } from '../../../single-spa/asset-url';
@Injectable({ providedIn: 'root' })
export class ConfigService {
	environment?: environment;
	private readonly _http = inject(HttpClient);
	async init() {
		const environment = assetUrl("environment.json");
		this.environment = await this._http.get<environment>(environment).toPromise();
	}
}
export function InitializeConfig(confg: ConfigService) {
	return () => confg.init();
}