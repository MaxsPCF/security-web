import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../common/config.service";
import { Template } from "./template";
import { TemplateMaintenanceResponse, TemplateSimpleResponse } from "./dto/templateResponses";
import { Guid } from "guid-typescript";
@Injectable({ providedIn: "root" })
export class TemplateService {
	private readonly _http = inject(HttpClient);
	private readonly _configService = inject(ConfigService);
	GetByFilter(templateCode: string, templateName: string): Observable<TemplateSimpleResponse[]> {
		if (templateCode == "") templateCode = Guid.EMPTY;
		if (templateName == "") templateName = "-";
		return this._http.get<TemplateSimpleResponse[]>(`${this._configService.environment?.apiPath}/Template/GetByFilter/${templateCode}/${templateName}`);
	}
	Find(realmCode: string): Observable<Template> {
		return this._http.get<Template>(`${this._configService.environment?.apiPath}/Template/Find/${realmCode}`);
	}
	Create(realm: Template): Observable<TemplateMaintenanceResponse> {
		return this._http.post<TemplateMaintenanceResponse>(`${this._configService.environment?.apiPath}/Template`, realm);
	}
	Update(realm: Template): Observable<TemplateMaintenanceResponse> {
		return this._http.put<TemplateMaintenanceResponse>(`${this._configService.environment?.apiPath}/Template`, realm);
	}
	Delete(realmCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Template/${realmCode}`);
	}
	GetAll(): Observable<TemplateSimpleResponse[]> {
		return this._http.get<TemplateSimpleResponse[]>(`${this._configService.environment?.apiPath}/Template/GetAll`);
	}
}
