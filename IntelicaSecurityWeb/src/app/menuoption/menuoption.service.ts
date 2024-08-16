import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { MenuOptionCreateResponses, MenuOptionParentResponses, MenuOptionSimpleResponses } from './dto/menuOptionResponses';
import { Guid } from 'guid-typescript';
import { MenuOptionCommands } from './dto/menuOptionRequests';

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

	Create(menuOption: MenuOptionCommands): Observable<MenuOptionCreateResponses> {
		return this._http.post<MenuOptionCreateResponses>(`${this._path}`, menuOption);
	}

	Update(menuOption: MenuOptionCommands): Observable<MenuOptionCreateResponses> {
		return this._http.put<MenuOptionCreateResponses>(`${this._path}`, menuOption);
	}

	GetById(menuOptionID: string): Observable<MenuOptionSimpleResponses> {
		return this._http.get<MenuOptionSimpleResponses>(`${this._path}/${menuOptionID}`);
	}

	Delete(menuOptionID: string): Observable<MenuOptionCreateResponses> {
		return this._http.delete<MenuOptionCreateResponses>(`${this._path}/${menuOptionID}`);
	}
}
