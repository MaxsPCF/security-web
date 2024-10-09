import Swal from "sweetalert2";
import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { SpinnerService } from "./spinner/spinner.service";
import { getCookie } from "typescript-cookie";
export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const spinner = inject(SpinnerService);	
	spinner.show();
	const HeaderSettings: { [name: string]: string | string[] } = {};
	if (!req.url.includes("assets/environment.json")) {
		HeaderSettings["Authorization"] = getCookie("token") ?? "";
		HeaderSettings["Accept"] = "application/json";
		HeaderSettings["Content-Type"] = "application/json";
	}
	let _request = req.clone({ headers: new HttpHeaders(HeaderSettings) });
	return next(_request).pipe(
		finalize(() => spinner.hide()),
		catchError(handleErrorResponse)
	);
};
function handleErrorResponse(error: HttpErrorResponse) {
	console.log(error, "error");
	if (error.status == 500) Swal.fire("Error", error.error.message, "error");
	if (error.status == 400) Swal.fire("Advertencia", error.error.message, "warning");
	if (error.status == 409) Swal.fire("Información ", error.error.message, "info");
	if (error.status == 401) Swal.fire("Información ", "No tiene acceso al recurso solicitado", "info");
	if (error.status == 503 || error.status == 0) Swal.fire("Error", "El servicio que se necesita consumir no esta activo o no responde.", "error");
	if (error.status == 405) Swal.fire("Error", "Los parametros enviados al servicio no coinciden.", "error");
	if (error.status == 404) Swal.fire("Error", "Recurso no encontrado.", "error");
	return throwError(() => {
		error.error, error.message;
	});
}
