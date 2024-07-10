import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { RealmGroupMaintenanceResponse, RealmGroupRoleSimpleResponse, RealmGroupSimpleResponse } from './dto/realmGroupResponses';
import { RealmGroup } from './realmGroup';

@Injectable({
	providedIn: 'root'
})
export class RealmGroupService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmID: string, realmGroupID: string, realmGroupName: string): Observable<RealmGroupSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		if (realmGroupID == '') realmGroupID = Guid.EMPTY;
		if (realmGroupName == '') realmGroupName = '-';
		return this._http.get<RealmGroupSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/RealmGroup/GetByFilter/${realmID}/${realmGroupID}/${realmGroupName}`
		);
	}
	Find(realmGroupID: string): Observable<RealmGroup> {
		return this._http.get<RealmGroup>(`${this._configService.environment?.apiPath}/RealmGroup/Find/${realmGroupID}`);
	}
	Create(realmGroup: RealmGroup): Observable<RealmGroupMaintenanceResponse> {
		return this._http.post<RealmGroupMaintenanceResponse>(`${this._configService.environment?.apiPath}/RealmGroup`, realmGroup);
	}
	Update(realmGroup: RealmGroup): Observable<RealmGroupMaintenanceResponse> {
		return this._http.put<RealmGroupMaintenanceResponse>(`${this._configService.environment?.apiPath}/RealmGroup`, realmGroup);
	}
	Delete(realmGroupID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/RealmGroup/${realmGroupID}`);
	}
	GetRealmGroupRolesByRealm(realmID: string): Observable<RealmGroupRoleSimpleResponse[]> {
		return this._http.get<RealmGroupRoleSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/RealmGroup/GetRealmGroupRolesByRealm/${realmID}`
		);
	}
}
