import Swal from "sweetalert2";
import { Component, HostListener, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {  NgSelectModule } from "@ng-select/ng-select";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { FeatureFlagService } from "../featureflag.service";
import { Router } from "@angular/router";
import { PageService } from "../../page/page.service";
import { FeatureFlagSimpleResponse } from "../dto/featureFlagResponses";
import { HtmlToExcel } from "../../common/HtmlToExcel";
import { PageSimpleResponse } from "../../page/dto/pageResponses";
@Component({
	selector: "security-featureflaglist",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbPagination],
	templateUrl: "./featureflaglist.component.html",
})
export class FeatureflaglistComponent {
	FeatureFlagID: string = "";
	PageID: string = "";
	FeatureFlagName: string = "";
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	pages: PageSimpleResponse[] = [];
	FeatureFlags: FeatureFlagSimpleResponse[] = [];
	FeatureFlagsFilter: FeatureFlagSimpleResponse[] = [];
	private readonly featureFlagService = inject(FeatureFlagService);
	private readonly pageService = inject(PageService);
	private readonly router = inject(Router);
	ngOnInit() {
		this.pageService.GetAll().subscribe(response => {
			this.pages = response;
			console.log(this.pages,"pages");
		});
		this.Search();
	}
	@HostListener("window:keydown.alt.s", ["$event"])
	Search() {
		this.featureFlagService.GetByFilter(this.FeatureFlagID, this.PageID, this.FeatureFlagName).subscribe(response => {
			this.FeatureFlags = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener("window:keydown.alt.a", ["$event"])
	Add() {
		this.router.navigate(["security/featureflag/maintenance"]);
	}
	@HostListener("window:keydown.alt.q", ["$event"])
	Export() {
		if (this.FeatureFlags.length == 0) {
			Swal.fire("Information", "There is no information to download.", "info");
			return;
		}
		let body: string = "<tr><th>Feature Flag Id</th><th>Feature Flag Name</th><th>Page Name</th></tr>";
		this.FeatureFlags.forEach(row => {
			body += `<tr><td>${row.featureFlagID}</td><td>${row.featureFlagName}</td> <td>${row.pageName}</td> </tr>`;
		});
		this.HtmlToExcel.ExportTOExcel("TableExport", body, `BankList`, "Bank list", "xlsx");
	}
	EditRow(row: FeatureFlagSimpleResponse) {
		this.router.navigate(["security/featureflag/maintenance", row.featureFlagID]);
	}
	DeleteRow(row: FeatureFlagSimpleResponse) {
		Swal.fire({
			title: "Esta seguro quen desea eliminar este registro?",
			showDenyButton: true,
			confirmButtonText: "Si",
			denyButtonText: "No",
		}).then(result => {
			if (result.isConfirmed) {
				this.featureFlagService.Delete(row.featureFlagID).subscribe(response => {
					Swal.fire("Informacion", `Feature Flag con codigo <br/> <b> ${row.featureFlagID}</b>  <br/> ha sido eliminado correctamente`, "success");
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	RefreshList(): void {
		this.FeatureFlagsFilter = this.FeatureFlags.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
