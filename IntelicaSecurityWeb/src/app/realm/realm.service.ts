import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/config.service';
import { Realm } from './realm';
import { RealmMaintenanceResponse, RealmSimpleResponse } from './dto/realmResponses';
import { Guid } from 'guid-typescript';
@Injectable({ providedIn: 'root' })
export class RealmService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(realmName: string): Observable<RealmSimpleResponse[]> {
		if (realmName == '') realmName = '-';
		return this._http.get<RealmSimpleResponse[]>(`${this._configService.environment?.apiPath}/Realm/GetByFilter/${realmName}`);
	}
	Find(realmCode: string): Observable<Realm> {
		return this._http.get<Realm>(`${this._configService.environment?.apiPath}/Realm/Find/${realmCode}`);
	}
	Create(realm: Realm): Observable<RealmMaintenanceResponse> {
		return this._http.post<RealmMaintenanceResponse>(`${this._configService.environment?.apiPath}/Realm`, realm);
	}
	Update(realm: Realm): Observable<RealmMaintenanceResponse> {
		return this._http.put<RealmMaintenanceResponse>(`${this._configService.environment?.apiPath}/Realm`, realm);
	}
	Delete(realmCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Realm/${realmCode}`);
	}
	GetAll(): Observable<RealmSimpleResponse[]> {
		return this._http.get<RealmSimpleResponse[]>(`${this._configService.environment?.apiPath}/Realm/GetAll`);
	}
}