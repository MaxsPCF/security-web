import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Observable } from 'rxjs';
import { BusinessUserMaintenanceResponse, BusinessUserSimpleResponse } from './dto/businessUserCommands';
import { Guid } from 'guid-typescript';
import { BusinessUser } from './businessUser';

@Injectable({
	providedIn: 'root'
})
export class BusinessuserService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(
		realmID: string,
		profileID: string,
		businessUserName: string,
		businessUserFirstName: string,
		businessUserLastName: string,
		businessUserEmail: string
	): Observable<BusinessUserSimpleResponse[]> {
		if (realmID == '' || realmID == null) realmID = Guid.EMPTY;
		if (profileID == '' || profileID == null) profileID = Guid.EMPTY;
		if (businessUserName == '') businessUserName = '-';
		if (businessUserFirstName == '') businessUserFirstName = '-';
		if (businessUserLastName == '') businessUserLastName = '-';
		if (businessUserEmail == '') businessUserEmail = '-';
		return this._http.get<BusinessUserSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/BusinessUser/GetByFilter/${realmID}/${profileID}/${businessUserName}/${businessUserFirstName}/${businessUserLastName}/${businessUserEmail}`
		);
	}
	Create(businessUser: BusinessUser): Observable<BusinessUserMaintenanceResponse> {
		return this._http.post<BusinessUserMaintenanceResponse>(`${this._configService.environment?.apiPath}/BusinessUser`, businessUser);
	}
	Find(businessUserID: string): Observable<BusinessUser> {
		return this._http.get<BusinessUser>(`${this._configService.environment?.apiPath}/BusinessUser/Find/${businessUserID}`);
	}
	Update(businessUser: BusinessUser): Observable<BusinessUserMaintenanceResponse> {
		return this._http.put<BusinessUser>(`${this._configService.environment?.apiPath}/BusinessUser`, businessUser);
	}
	Delete(businessUserID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/BusinessUser/${businessUserID}`);
	}
	FindDetails(businessUserID: string): Observable<BusinessUser> {
		return this._http.get<BusinessUser>(`${this._configService.environment?.apiPath}/BusinessUser/FindDetails/${businessUserID}`);
	}
}
