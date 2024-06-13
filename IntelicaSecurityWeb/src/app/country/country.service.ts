import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/config.service';
import { Country } from './country';
import {
  CountryCreateResponse,
  CountrySimpleResponse,
} from './dto/countryResponses';
import { Guid } from 'guid-typescript';
@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly _http = inject(HttpClient);
  private readonly _configService = inject(ConfigService);
  Create(Country: Country): Observable<CountryCreateResponse> {
    return this._http.post<CountryCreateResponse>(
      `${this._configService.environment?.apiPath}/Country`,
      Country
    );
  }
  Update(Country: Country): Observable<CountryCreateResponse> {
    return this._http.put<CountryCreateResponse>(
      `${this._configService.environment?.apiPath}/Country`,
      Country
    );
  }
  Delete(CountryId: string): Observable<boolean> {
    return this._http.delete<boolean>(
      `${this._configService.environment?.apiPath}/Country/${CountryId}`
    );
  }
  Find(CountryId: string): Observable<Country> {
    return this._http.get<Country>(
      `${this._configService.environment?.apiPath}/Country/${CountryId}`
    );
  }
  GetByAll(): Observable<CountrySimpleResponse[]> {
    return this._http.get<CountrySimpleResponse[]>(
      `${this._configService.environment?.apiPath}/Country/`
    );
  }
  GetByFilter(
    CountryCode: string,
    CountryName: string
  ): Observable<CountrySimpleResponse[]> {
    if (CountryCode == '') CountryCode = '-';
    if (CountryName == '') CountryName = '-';
    return this._http.get<CountrySimpleResponse[]>(
      `${this._configService.environment?.apiPath}/Country/GetByFilter/${CountryCode}/${CountryName}`
    );
  }
}
