import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../common/config.service";
import { Realm } from "./realm";
import { RealmCreateResponse, RealmSimpleResponse } from "./dto/realmResponses";
import { Guid } from "guid-typescript";
@Injectable({ providedIn: "root" })
export class RealmService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	Create(realm: Realm): Observable<RealmCreateResponse> {
		return this._http.post<RealmCreateResponse>(`${this._configService.environment?.apiPath}/Realm`, realm);
	}
	Update(realm: Realm): Observable<boolean> {
		return this._http.put<boolean>(`${this._configService.environment?.apiPath}/Realm`, realm);
	}
	Delete(realmCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Realm/${realmCode}`);
	}
	Find(realmCode: string): Observable<Realm> {
		return this._http.get<Realm>(`${this._configService.environment?.apiPath}/Realm/${realmCode}`);
	}
	GetByFilter(realmCode: string, realmName: string): Observable<RealmSimpleResponse[]> {
		if (realmCode == "") realmCode = Guid.EMPTY;
		if (realmName == "") realmName = "-";
		return this._http.get<RealmSimpleResponse[]>(`${this._configService.environment?.apiPath}/Realm/GetByFilter/${realmCode}/${realmName}`);
	}
}
