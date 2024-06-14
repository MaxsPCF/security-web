import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/config.service';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ClientMaintenanceResponse, ClientSimpleResponse } from './dto/clientResponses';
import { Client } from './client';
import { ClientCreateCommand, ClientUpdateCommand } from './dto/clientCommands';

@Injectable({
	providedIn: 'root'
})
export class ClientService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(clientCode: string, clientId: string, clientName: string): Observable<ClientSimpleResponse[]> {
		if (clientCode == '' || clientCode == null) clientCode = Guid.EMPTY;
		if (clientId == '') clientId = '-';
		if (clientName == '') clientName = '-';
		return this._http.get<ClientSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/Client/GetByFilter/${clientCode}/${clientId}/${clientName}`
		);
	}
	Find(clientCode: string): Observable<Client> {
		return this._http.get<Client>(`${this._configService.environment?.apiPath}/Client/Find/${clientCode}`);
	}
	Create(client: Client): Observable<ClientMaintenanceResponse> {
		return this._http.post<ClientMaintenanceResponse>(`${this._configService.environment?.apiPath}/Client`, client);
	}
	Update(client: Client): Observable<ClientMaintenanceResponse> {
		return this._http.put<ClientMaintenanceResponse>(`${this._configService.environment?.apiPath}/Client`, client);
	}
	Delete(clientCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Client/${clientCode}`);
	}
}
