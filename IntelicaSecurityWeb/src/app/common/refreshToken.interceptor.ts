import { HttpClient } from "@angular/common/http";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { from, switchMap } from "rxjs";
import { SpinnerService } from "./spinner/spinner.service";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { ConfigService } from "./services/config.service";
import { ValidateTokenQuery, ValidateTokenResponse } from "./dto/authentication.dto";
import CommonFeatureFlagService from "./services/featureFlagCommon.service";
export const RefreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
	const spinner = inject(SpinnerService);
	const configService: ConfigService = inject(ConfigService);
	const httpClient = inject(HttpClient);
	const commonFeatureFlagService = inject(CommonFeatureFlagService);
	spinner.show();
	let _request = req.clone();
	let authenticationLocation = `${configService.environment?.authenticationWeb}?callback=${window.location.href}&clientID=${configService.environment?.clientID}`;
	let path = `${configService.environment?.authenticationPath ?? ""}/Authenticate/ValidateToken`;
	let validateTokenQuery: ValidateTokenQuery = {
		token: getCookie("token") ?? "",
		refreshToken: getCookie("refreshToken") ?? "",
		ip: "",
		clientID: configService.environment?.clientID ?? "",
		pageRoot: commonFeatureFlagService.GetPageRoot(),
		httpVerb: "GET"
	};
	if (!req.url.includes("ValidateToken") && !req.url.includes("assets/environment.json"))
		return from(httpClient.post<ValidateTokenResponse>(path, validateTokenQuery)).pipe(
			switchMap((response: ValidateTokenResponse) => {
				if (response.expired) {
					removeCookie("token");
					removeCookie("refreshToken");
					window.location.href = authenticationLocation;
					return next(_request);
				}
				if (response.unauthorized)window.location.href = window.location.origin;
				if (response.newToken != "") setCookie("token", response.newToken);
				return next(_request);
			})
		);
	else return next(_request);
};
async function ValidateToken(httpClient: HttpClient, authenticationPath: string, clientID: string) {
	let validateTokenQuery: ValidateTokenQuery = { token: getCookie("token") ?? "", refreshToken: getCookie("refreshToken") ?? "", ip: "", clientID: clientID, pageRoot: "menu", httpVerb: "GET" };
	let path = `${authenticationPath}/Authenticate/ValidateToken`;
	let response = await httpClient.post<ValidateTokenResponse>(path, validateTokenQuery).toPromise();
	return response;
}