import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { RealmRoleMaintenanceResponse, RealmRoleSimpleResponse } from './dto/realmRoleResponses';
import { RealmRole } from './realmRole';
@Injectable({
	providedIn: 'root'
})
export class RealmRoleService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmID: string, realmRoleID: string, realmROleName: string): Observable<RealmRoleSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		if (realmRoleID == '') realmRoleID = Guid.EMPTY;
		if (realmROleName == '') realmROleName = '-';
		return this._http.get<RealmRoleSimpleResponse[]>(
			`${this._configService.environment?.securityPath}/RealmRole/GetByFilter/${realmID}/${realmRoleID}/${realmROleName}`
		);
	}
	GetAll(): Observable<RealmRoleSimpleResponse[]> {
		return this._http.get<RealmRoleSimpleResponse[]>(`${this._configService.environment?.securityPath}/RealmRole/GetAll`);
	}
	Find(realmRoleID: string): Observable<RealmRole> {
		return this._http.get<RealmRole>(`${this._configService.environment?.securityPath}/RealmRole/Find/${realmRoleID}`);
	}
	Create(realmRole: RealmRole): Observable<RealmRoleMaintenanceResponse> {
		return this._http.post<RealmRoleMaintenanceResponse>(`${this._configService.environment?.securityPath}/RealmRole`, realmRole);
	}
	Update(realmRole: RealmRole): Observable<RealmRoleMaintenanceResponse> {
		return this._http.put<RealmRoleMaintenanceResponse>(`${this._configService.environment?.securityPath}/RealmRole`, realmRole);
	}
	Delete(realmRoleID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.securityPath}/RealmRole/${realmRoleID}`);
	}
	GetRealmRolesByRealm(realmID: string): Observable<RealmRoleSimpleResponse[]> {
		return this._http.get<RealmRoleSimpleResponse[]>(`${this._configService.environment?.securityPath}/RealmRole/GetRealmRolesByRealm/${realmID}`);
	}
}
