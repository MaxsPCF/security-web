import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../common/services/config.service";
import { FeatureFlagSimpleResponse } from "./dto/featureFlagResponses";
@Injectable({ providedIn: "root" })
export class FeatureFlagService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByPageRoot(pageRoot: string): Observable<FeatureFlagSimpleResponse[]> {
		return this._http.get<FeatureFlagSimpleResponse[]>(`${this._configService.environment?.configurationPath}/FeatureFlag/${pageRoot}`);
	}
}