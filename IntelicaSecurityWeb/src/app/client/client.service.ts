import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ClientMaintenanceResponse, ClientSimpleResponse } from './dto/clientResponses';
import { Client } from './client';
@Injectable({
	providedIn: 'root'
})
export class ClientService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(clientID: string, realmID: string, clientName: string): Observable<ClientSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		if (clientID == '') clientID = '-';
		if (clientName == '') clientName = '-';
		return this._http.get<ClientSimpleResponse[]>(
			`${this._configService.environment?.securityPath}/Client/GetByFilter/${clientID}/${realmID}/${clientName}`
		);
	}
	Find(clientID: string): Observable<Client> {
		return this._http.get<Client>(`${this._configService.environment?.securityPath}/Client/Find/${clientID}`);
	}
	Create(client: Client): Observable<ClientMaintenanceResponse> {
		return this._http.post<ClientMaintenanceResponse>(`${this._configService.environment?.securityPath}/Client`, client);
	}
	Update(client: Client): Observable<ClientMaintenanceResponse> {
		return this._http.put<ClientMaintenanceResponse>(`${this._configService.environment?.securityPath}/Client`, client);
	}
	Delete(clientID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.securityPath}/Client/${clientID}`);
	}
}
