import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { TermPageResponse } from "./dto/term";
@Injectable({
	providedIn: "root",
})
class PermissionsService {	
	constructor() {}
	async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		while (true) {
			await sleep(10);
			if (document.querySelectorAll("[data-security]").length > 0) break;
		}
		let termsString = sessionStorage.getItem("Term");		
		if (termsString == null) return true;
		let terms: TermPageResponse[] = JSON.parse(termsString);
		const textsToChange = document.querySelectorAll("[data-security]");
		textsToChange.forEach(async element => {
			let dataValue = element.getAttribute("data-security");			
			let newText = terms.find(x => x.termName == dataValue)?.termValue ?? "";
			element.innerHTML = newText;
			element.setAttribute("placeholder", newText);
		});
		return true;
	}
}
function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export const TermGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
	inject(PermissionsService).canActivate(next, state);
	return true;
};