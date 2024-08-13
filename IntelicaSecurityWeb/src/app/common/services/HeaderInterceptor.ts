import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Clone the request and replace the original headers with
		// cloned headers, updated with the authorization.
		console.log(req);

		const authReq = req.clone({
			headers: req.headers.set('MenuUserID', localStorage.getItem('MenuUserID') || '')
		});
		return next.handle(authReq);
	}
}
