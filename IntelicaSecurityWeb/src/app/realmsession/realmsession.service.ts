import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { RealmSessionSimpleResponse } from './dto/realmResponses';

@Injectable({
	providedIn: 'root'
})
export class RealmsessionService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);

	GetByFilter(realmID: string): Observable<RealmSessionSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		return this._http.get<RealmSessionSimpleResponse[]>(`${this._configService.environment?.apiPath}/RealmSession/GetByFilter/${realmID}`);
	}
	SignOut(sessionID: string, realmID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/RealmSession/${sessionID}/${realmID}`);
	}
}
