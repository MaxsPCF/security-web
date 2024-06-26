import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { RealmRoleMaintenanceResponse, RealmRoleSimpleResponse } from './dto/realmRoleResponses';
import { RealmRole } from './realmRole';
import { RealmRoleCreateCommand, RealmRoleUpdateCommand } from './dto/realmRoleCommands';

@Injectable({
	providedIn: 'root'
})
export class RealmRoleService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmCode: string, realmRoleCode: string, realmROleName: string): Observable<RealmRoleSimpleResponse[]> {
		if (realmCode == '' || realmCode == null) realmCode = Guid.EMPTY;
		if (realmRoleCode == '') realmRoleCode = Guid.EMPTY;
		if (realmROleName == '') realmROleName = '-';
		return this._http.get<RealmRoleSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/RealmRole/GetByFilter/${realmCode}/${realmRoleCode}/${realmROleName}`
		);
	}
	GetAll(): Observable<RealmRoleSimpleResponse[]> {
		return this._http.get<RealmRoleSimpleResponse[]>(`${this._configService.environment?.apiPath}/RealmRole/GetAll`);
	}
	Find(realmRoleCode: string): Observable<RealmRole> {
		return this._http.get<RealmRole>(`${this._configService.environment?.apiPath}/RealmRole/Find/${realmRoleCode}`);
	}
	Create(realmRole: RealmRole): Observable<RealmRoleMaintenanceResponse> {
		return this._http.post<RealmRoleMaintenanceResponse>(`${this._configService.environment?.apiPath}/RealmRole`, realmRole);
	}
	Update(realmRole: RealmRole): Observable<RealmRoleMaintenanceResponse> {
		return this._http.put<RealmRoleMaintenanceResponse>(`${this._configService.environment?.apiPath}/RealmRole`, realmRole);
	}
	Delete(realmRoleCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/RealmRole/${realmRoleCode}`);
	}
}
