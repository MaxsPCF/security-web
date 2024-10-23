import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { BankGroupCreateResponse, BankGroupSimpleResponse } from './dto/bankGroupResponses';
import { Guid } from 'guid-typescript';
import { BankGroup } from './bankgroup';

@Injectable({ providedIn: 'root' })
export class BankGroupService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	private _path: string = `${this._configService.environment?.securityPath}/BankGroup`;

	GetAll(): Observable<BankGroupSimpleResponse[]> {
		return this._http.get<BankGroupSimpleResponse[]>(`${this._path}`);
	}
	GetByFilter(bankGroupCode: string, bankGroupName: string, bankGroupDatabase: string): Observable<BankGroupSimpleResponse[]> {
		if (bankGroupCode == '') bankGroupCode = Guid.EMPTY;
		if (bankGroupName == '') bankGroupName = '-';
		if (bankGroupDatabase == '') bankGroupDatabase = '-';
		return this._http.get<BankGroupSimpleResponse[]>(`${this._configService.environment?.securityPath}/BankGroup/GetByFilter/${bankGroupCode}/${bankGroupName}/${bankGroupDatabase}`);
	}
	Delete(bankId: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.securityPath}/BankGroup/${bankId}`);
	}
	Find(bankId: string): Observable<BankGroup> {
		return this._http.get<BankGroup>(`${this._configService.environment?.securityPath}/BankGroup/${bankId}`);
	}
	Create(bank: BankGroup): Observable<BankGroupCreateResponse> {
		return this._http.post<BankGroupCreateResponse>(`${this._configService.environment?.securityPath}/BankGroup`, bank);
	}
	Update(bank: BankGroup): Observable<BankGroupCreateResponse> {
		return this._http.put<BankGroupCreateResponse>(`${this._configService.environment?.securityPath}/BankGroup`, bank);
	}
	TestS3(valor: string): Observable<any> {
		const requestBody = {
		  fileBytes: valor // Convierte a un arreglo normal
		};
	  
		return this._http.post<any>(
		  `${this._configService.environment?.securityPath}/BankGroup/TestServiceS3`,
		  requestBody 
		);
	  }
}
