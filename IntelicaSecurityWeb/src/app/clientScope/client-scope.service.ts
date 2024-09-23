import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { ClientScope } from './clientScope';
import { ClientScopeMaintenanceResponse, ClientScopeSimpleResponse } from './dto/clientScopeResponses';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClientScopeService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmID: string, clientScopeName: string, clientScopeDescription: string): Observable<ClientScopeSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		if (clientScopeName == '') clientScopeName = '-';
		if (clientScopeDescription == '') clientScopeDescription = '-';
		return this._http.get<ClientScopeSimpleResponse[]>(
			`${this._configService.environment?.securityPath}/ClientScope/GetByFilter/${realmID}/${clientScopeName}/${clientScopeDescription}`
		);
	}
	Find(clientScopeID: string): Observable<ClientScope> {
		return this._http.get<ClientScope>(`${this._configService.environment?.securityPath}/ClientScope/Find/${clientScopeID}`);
	}
	Create(client: ClientScope): Observable<ClientScopeMaintenanceResponse> {
		return this._http.post<ClientScopeMaintenanceResponse>(`${this._configService.environment?.securityPath}/ClientScope`, client);
	}
	Update(client: ClientScope): Observable<ClientScopeMaintenanceResponse> {
		return this._http.put<ClientScopeMaintenanceResponse>(`${this._configService.environment?.securityPath}/ClientScope`, client);
	}
	Delete(clientScopeID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.securityPath}/ClientScope/${clientScopeID}`);
	}
}
