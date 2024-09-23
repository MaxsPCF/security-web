import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { ProfileCreateResponses, ProfileSimpleResponses } from './dto/profileResponses';
import { ProfileCommand } from './dto/profileRequests';

@Injectable({ providedIn: 'root' })
export class ProfileService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	private _path: string = `${this._configService.environment?.securityPath}/Profile`;

	Create(profile: ProfileCommand): Observable<ProfileCreateResponses> {
		return this._http.post<ProfileCreateResponses>(`${this._path}`, profile);
	}

	Update(profile: ProfileCommand): Observable<ProfileCreateResponses> {
		return this._http.put<ProfileCreateResponses>(`${this._path}`, profile);
	}

	Delete(profileId: string): Observable<ProfileCreateResponses> {
		return this._http.delete<ProfileCreateResponses>(`${this._path}/${profileId}`);
	}

	GetById(profileId: string): Observable<ProfileSimpleResponses> {
		return this._http.get<ProfileSimpleResponses>(`${this._path}/${profileId}`);
	}

	GetAll(): Observable<ProfileSimpleResponses[]> {
		return this._http.get<ProfileSimpleResponses[]>(`${this._path}`);
	}

	GetByFilter(name: string, description: string): Observable<ProfileSimpleResponses[]> {
		if (name?.trim() == '') name = '-';
		if (description?.trim() == '') description = '-';
		return this._http.get<ProfileSimpleResponses[]>(`${this._path}/GetByFilter/${name}/${description}`);
	}
}
