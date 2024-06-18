import Swal from "sweetalert2";
import { Component, HostListener, inject } from "@angular/core";
import { TemplateSimpleResponse } from "../dto/templateResponses";
import { Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateService } from "../template.service";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule, CurrencyPipe, DecimalPipe } from "@angular/common";
import { HtmlToExcel } from "../../common/HtmlToExcel";
@Component({
	selector: "security-templatelist",
	standalone: true,
	imports: [CommonModule, NgbPaginationModule, FormsModule, ReactiveFormsModule, NgSelectModule, DecimalPipe, CurrencyPipe],
	templateUrl: "./templatelist.component.html",
})
export class TemplatelistComponent {
	TemplateName: string = "";
	TemplateCode: string = "";
	TemplateCreationDate: Date = new Date();
	Templates: TemplateSimpleResponse[] = [];
	TemplatesFiler: TemplateSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 10;
	HtmlToExcel: HtmlToExcel = new HtmlToExcel();
	private readonly TemplateService = inject(TemplateService);
	private readonly router = inject(Router);
	Home() {}
	@HostListener("window:keydown.alt.s", ["$event"])
	Search() {
		this.TemplateService.GetByFilter(this.TemplateCode, this.TemplateName).subscribe(response => {
			this.Templates = response;
			this.Page = 1;
			this.RefreshList();
		});
	}
	@HostListener("window:keydown.alt.a", ["$event"])
	Add() {
		this.router.navigate(["security/template/maintenance"]);
	}
	@HostListener("window:keydown.alt.q", ["$event"])
	Export() {
		if (this.Templates.length == 0) {
			Swal.fire("Information","There is no information to download.","info");
			return;
		}
		let body: string ="<tr><th>Template code</th><th>Template name</th></tr>";
		this.Templates.forEach(row => {
			body += `<tr><td>${row.templateCode}</td><td>${row.templateName}</td></tr>`;
		});
		this.HtmlToExcel.ExportTOExcel("TableExport", body, `TempateList`, "Template list", "xlsx");
	}
	EditRow(row: TemplateSimpleResponse) {
		this.router.navigate(["security/template/maintenance" , row.templateCode]);
	}
	DeleteRow(row: TemplateSimpleResponse) {
		Swal.fire({
			title: "Are you sure you want to delete this record?",
			showDenyButton: true,
			confirmButtonText: "Yes",
			denyButtonText: "No",
			icon:"info"
		}).then(result => {
			if (result.isConfirmed) {
				this.TemplateService.Delete(row.templateCode).subscribe(() => {
					Swal.fire("Information", `Realm with code <br/> <b> ${row.templateCode}</b>  <br/>has been successfully deleted`, "success");
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	ViewDetail(row: TemplateSimpleResponse){
		this.router.navigate(["security/template/maintenance",true ,row.templateCode]);
	}
	SelectRow(row: TemplateSimpleResponse) {}
	RefreshList(): void {
		this.TemplatesFiler = this.Templates.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
