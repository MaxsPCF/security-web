import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../common/services/config.service';
import { Observable } from 'rxjs';
import { BusinessUserMaintenanceResponse, BusinessUserSimpleResponse, BusinessUserSimpleResponses } from './dto/businessUserResponses';
import { Guid } from 'guid-typescript';
import { BusinessUserRequest } from './dto/businessUser';

@Injectable({
	providedIn: 'root'
})
export class BusinessuserService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);

	GetByFilter(profileID: string, businessUserName: string, businessUserEmail: string): Observable<BusinessUserSimpleResponse[]> {
		if (profileID == '' || profileID == null) profileID = Guid.EMPTY;
		if (businessUserName == '') businessUserName = '-';
		if (businessUserEmail == '') businessUserEmail = '-';
		return this._http.get<BusinessUserSimpleResponse[]>(
			`${this._configService.environment?.apiPath}/BusinessUser/GetByFilter/${profileID}/${businessUserName}/${businessUserEmail}`
		);
	}

	GetById(businessUserID: string): Observable<BusinessUserSimpleResponses> {
		return this._http.get<BusinessUserSimpleResponses>(`${this._configService.environment?.apiPath}/BusinessUser/${businessUserID}`);
	}

	GetByAll(): Observable<BusinessUserSimpleResponses[]> {
		return this._http.get<BusinessUserSimpleResponses[]>(`${this._configService.environment?.apiPath}/BusinessUser`);
	}

	Create(businessUser: BusinessUserRequest): Observable<BusinessUserMaintenanceResponse> {
		return this._http.post<BusinessUserMaintenanceResponse>(`${this._configService.environment?.apiPath}/BusinessUser`, businessUser);
	}

	Find(businessUserID: string): Observable<BusinessUserRequest> {
		return this._http.get<BusinessUserRequest>(`${this._configService.environment?.apiPath}/BusinessUser/Find/${businessUserID}`);
	}

	Update(businessUser: BusinessUserRequest): Observable<BusinessUserMaintenanceResponse> {
		return this._http.put<BusinessUserRequest>(`${this._configService.environment?.apiPath}/BusinessUser`, businessUser);
	}

	Delete(businessUserID: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/BusinessUser/${businessUserID}`);
	}

	FindDetails(businessUserID: string): Observable<BusinessUserRequest> {
		return this._http.get<BusinessUserRequest>(`${this._configService.environment?.apiPath}/BusinessUser/FindDetails/${businessUserID}`);
	}
}
