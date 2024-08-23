import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { FeatureFlag } from './featureFlag';
import { FeatureFlagMaintenanceResponse, FeatureFlagSimpleResponse } from './dto/featureFlagResponses';
@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	private _path: string = `${this._configService.environment?.apiPath}`;
	GetByPageRoot(pageRoot:string): Observable<FeatureFlagSimpleResponse[]> {
		return this._http.get<FeatureFlagSimpleResponse[]>(`${this._configService.environment?.apiPath}/FeatureFlag/${pageRoot}`);
	}
	GetByFilter(featureFlagID: string, pageID: string, featureFlagName: string): Observable<FeatureFlagSimpleResponse[]> {
		if (featureFlagID == '' || featureFlagID == null) featureFlagID = Guid.EMPTY;
		if (pageID == '' || pageID == null) pageID = Guid.EMPTY;
		if (featureFlagName == '') featureFlagName = '-';
		return this._http.get<FeatureFlagSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/FeatureFlagMaintenance/GetByFilter/${featureFlagID}/${pageID}/${featureFlagName}`
		);
	}
	Find(featureFlagID: string): Observable<FeatureFlag> {
		return this._http.get<FeatureFlag>(`${this._configService.environment?.apiPath}/FeatureFlagMaintenance/${featureFlagID}`);
	}
	Create(featureFlag: FeatureFlag): Observable<FeatureFlagMaintenanceResponse> {
		return this._http.post<FeatureFlagMaintenanceResponse>(`${this._configService.environment?.apiPath}/FeatureFlagMaintenance`, featureFlag);
	}
	Update(featureFlag: FeatureFlag): Observable<FeatureFlagMaintenanceResponse> {
		return this._http.put<FeatureFlagMaintenanceResponse>(`${this._configService.environment?.apiPath}/FeatureFlagMaintenance`, featureFlag);
	}
	Delete(featureFlagID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/FeatureFlagMaintenance/${featureFlagID}`);
	}
}