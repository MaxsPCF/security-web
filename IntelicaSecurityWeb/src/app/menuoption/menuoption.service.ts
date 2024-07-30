import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { MenuOptionParentResponses, MenuOptionSimpleResponses } from './dto/menuOptionResponses';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class MenuOptionService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	private _path: string = `${this._configService.environment?.apiPath}/MenuOption`;

	GetAll(): Observable<MenuOptionSimpleResponses[]> {
		return this._http.get<MenuOptionSimpleResponses[]>(`${this._path}`);
	}

	GetMenuOptionParentAll(): Observable<MenuOptionParentResponses[]> {
		return this._http.get<MenuOptionParentResponses[]>(`${this._path}/GetMenuOptionParentAll`);
	}

	GetByFilter(menuOptionParentID: string, menuOptionName: string): Observable<MenuOptionSimpleResponses[]> {
		if (menuOptionParentID == '' || menuOptionParentID == null) menuOptionParentID = Guid.EMPTY;
		if (menuOptionName?.trim() == '') menuOptionName = '-';
		return this._http.get<MenuOptionSimpleResponses[]>(`${this._path}/GetByFilter/${menuOptionParentID}/${menuOptionName}`);
	}

	// Create(profile: ProfileCommand): Observable<ProfileCreateResponses> {
	// 	return this._http.post<ProfileCreateResponses>(`${this._path}`, profile);
	// }

	// Update(profile: ProfileCommand): Observable<ProfileCreateResponses> {
	// 	return this._http.put<ProfileCreateResponses>(`${this._path}`, profile);
	// }

	// Delete(profileId: string): Observable<ProfileCreateResponses> {
	// 	return this._http.delete<ProfileCreateResponses>(`${this._path}/${profileId}`);
	// }

	// Find(profileId: string): Observable<ProfileSimpleResponses> {
	// 	return this._http.get<ProfileSimpleResponses>(`${this._path}/${profileId}`);
	// }
}
