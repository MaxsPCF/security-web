import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { RealmGroupMaintenanceResponse, RealmGroupSimpleResponse } from './dto/realmGroupResponses';
import { RealmGroup } from './realmGroup';
import { RealmGroupCreateCommand, RealmGroupUpdateCommand } from './dto/realmGroupCommands';

@Injectable({
	providedIn: 'root'
})
export class RealmGroupService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmCode: string, realmGroupCode: string, realmGroupName: string): Observable<RealmGroupSimpleResponse[]> {
		if (realmCode == '' || realmCode == null) realmCode = Guid.EMPTY;
		if (realmGroupCode == '') realmGroupCode = Guid.EMPTY;
		if (realmGroupName == '') realmGroupName = '-';
		return this._http.get<RealmGroupSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/Group/GetByFilter/${realmCode}/${realmGroupCode}/${realmGroupName}`
		);
	}
	Find(realmGroupCode: string): Observable<RealmGroup> {
		return this._http.get<RealmGroup>(`${this._configService.environment?.apiPath}/Group/Find/${realmGroupCode}`);
	}
	Create(realmGroup: RealmGroup): Observable<RealmGroupMaintenanceResponse> {
		return this._http.post<RealmGroupMaintenanceResponse>(`${this._configService.environment?.apiPath}/Group`, realmGroup);
	}
	Update(realmGroup: RealmGroup): Observable<RealmGroupMaintenanceResponse> {
		return this._http.put<RealmGroupMaintenanceResponse>(`${this._configService.environment?.apiPath}/Group`, realmGroup);
	}
	Delete(realmGroupCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Group/${realmGroupCode}`);
	}
}
