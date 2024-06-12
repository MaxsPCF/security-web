import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../common/config.service';
import { Guid } from 'guid-typescript';
import { PageCreateResponse, PageSimpleResponse } from './dto/pageResponses';
import { PageCommand } from './dto/pageRequests';

@Injectable({ providedIn: 'root' })
export class PageService {
  private readonly _http = inject(HttpClient);
  private readonly _configService = inject(ConfigService);
  private _path: string = `${this._configService.environment?.apiPath}`;

  Create(page: PageCommand): Observable<PageCreateResponse> {
    return this._http.post<PageCreateResponse>(`${this._path}/Page`, page);
  }

  Update(page: PageCommand): Observable<PageCreateResponse> {
    return this._http.put<PageCreateResponse>(`${this._path}/Page`, page);
  }

  Delete(pageId: string): Observable<PageCreateResponse> {
    return this._http.delete<PageCreateResponse>(
      `${this._path}/Page/${pageId}`
    );
  }

  Find(pageId: string): Observable<PageSimpleResponse[]> {
    return this._http.get<PageSimpleResponse[]>(`${this._path}/Page/${pageId}`);
  }

  GetAll(): Observable<PageSimpleResponse[]> {
    return this._http.get<PageSimpleResponse[]>(`${this._path}/Page`);
  }
}
