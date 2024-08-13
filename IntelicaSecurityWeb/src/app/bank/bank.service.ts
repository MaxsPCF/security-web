import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { Bank } from './bank';
import { BankCreateResponse, BankSimpleResponse } from './dto/bankResponses';
import { Guid } from 'guid-typescript';
@Injectable({ providedIn: 'root' })
export class BankService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	Create(bank: Bank): Observable<BankCreateResponse> {
		return this._http.post<BankCreateResponse>(`${this._configService.environment?.apiPath}/Bank`, bank);
	}
	Update(bank: Bank): Observable<BankCreateResponse> {
		return this._http.put<BankCreateResponse>(`${this._configService.environment?.apiPath}/Bank`, bank);
	}
	Delete(bankId: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Bank/${bankId}`);
	}
	Find(bankId: string): Observable<Bank> {
		return this._http.get<Bank>(`${this._configService.environment?.apiPath}/Bank/${bankId}`);
	}
	GetByFilter(bankCode: string, bankName: string): Observable<BankSimpleResponse[]> {
		if (bankCode == '') bankCode = Guid.EMPTY;
		if (bankName == '') bankName = '-';
		return this._http.get<BankSimpleResponse[]>(`${this._configService.environment?.apiPath}/Bank/GetByFilter/${bankCode}/${bankName}`);
	}
}
