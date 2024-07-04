import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../common/services/config.service";
import { Template } from "./template";
import { TemplateMaintenanceResponse, TemplateMassive, TemplateSimpleResponse } from "./dto/templateResponses";
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
	Find(templateCode: string): Observable<Template> {
		return this._http.get<Template>(`${this._configService.environment?.apiPath}/Template/Find/${templateCode}`);
	}
	Create(template: Template): Observable<TemplateMaintenanceResponse> {
		return this._http.post<TemplateMaintenanceResponse>(`${this._configService.environment?.apiPath}/Template`, template);
	}
	Distribution(template: TemplateMassive[]): Observable<boolean> {
		return this._http.post<boolean>(`${this._configService.environment?.apiPath}/TemplateMassive`, template);
	}
	Update(template: Template): Observable<TemplateMaintenanceResponse> {
		return this._http.put<TemplateMaintenanceResponse>(`${this._configService.environment?.apiPath}/Template`, template);
	}
	Delete(templateCode: string): Observable<boolean> {
		return this._http.delete<boolean>(`${this._configService.environment?.apiPath}/Template/${templateCode}`);
	}
	GetAll(): Observable<TemplateSimpleResponse[]> {
		return this._http.get<TemplateSimpleResponse[]>(`${this._configService.environment?.apiPath}/Template/GetAll`);
	}
}