import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";
import { TermPageResponse } from "../dto/term";
@Injectable({ providedIn: "root" })
export class TermService {
	private readonly _http = inject(HttpClient);
	private readonly _config = inject(ConfigService);
	GetPageTerm(languageCode: string, pageRoot: string): Observable<TermPageResponse[]> {
		return this._http.get<TermPageResponse[]>(`${this._config.environment?.configurationPath}/Term/GetPageTerm/${languageCode}/${pageRoot}`);
	}
}