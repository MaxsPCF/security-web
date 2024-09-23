import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/services/config.service';
import { BankGroupSimpleResponse } from './dto/bankGroupResponses';

@Injectable({ providedIn: 'root' })
export class BankGroupService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	private _path: string = `${this._configService.environment?.securityPath}/BankGroup`;

	GetAll(): Observable<BankGroupSimpleResponse[]> {
		return this._http.get<BankGroupSimpleResponse[]>(`${this._path}`);
	}
}
