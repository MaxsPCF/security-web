import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getCookie, removeCookie } from "typescript-cookie";
@Injectable({ providedIn: "root" })
export class AuthenticationService {
	private readonly _http = inject(HttpClient);
	public IsLoggedIn: boolean = false;
	async init() {
		var token = getCookie("token");
		var callBack = window.location.href;
		if (token == undefined) window.location.href = `http://localhost:4205?callback=${callBack}&clientID=TestLogin`;
		const HeaderSettings: { [name: string]: string | string[] } = {};
		HeaderSettings["Token"] = token ?? "";
		console.log(token,"token-authservice");
		var valid = await this._http.get<boolean>(`http://localhost:5182/Authenticate/ValidToken/Bank/Get`, { headers: new HttpHeaders(HeaderSettings) }).toPromise();
		if (valid) this.IsLoggedIn = true;
		else window.location.href = `http://localhost:4205?callback=${callBack}&clientID=TestLogin`;
	}
	logout() {
		removeCookie("token");
		window.location.href = `http://localhost:4205?callback=${window.location.href}`;
	}
}
export function InitializeConfig(confg: AuthenticationService) {
	return () => confg.init();
}