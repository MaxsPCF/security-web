import { Component, inject } from "@angular/core";
import { TemplateSimpleResponse } from "../dto/templateResponses";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateService } from "../template.service";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'security-templatelist',
  standalone: true,
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './templatelist.component.html'
})
export class TemplatelistComponent {
  TemplateName: string = "";
	TemplateCode: string = "";
	TemplateCreationDate:Date = new Date() ;
	Templates: TemplateSimpleResponse[] = [];
	TemplatesFiler: TemplateSimpleResponse[] = [];
	Page: number = 1;
	PageSize: number = 15;
	private readonly TemplateService = inject(TemplateService);
	private readonly router = inject(Router);

	ngOnInit() {
		this.Search();
	}
	Home() {}
	Search() {
		this.TemplateService.GetByFilter(this.TemplateCode, this.TemplateName).subscribe(response => {
			this.Templates = response;
		});
	}
	Add() {
		this.router.navigate(["security/Template/maintenance"]);
	}
	Export() {}
	EditRow(row: TemplateSimpleResponse) {
		this.router.navigate(["security/Template/maintenance", row.templateCode]);
	}
	DeleteRow(row: TemplateSimpleResponse) {
		Swal.fire({
			title: "Esta seguro quen desea eliminar este registro?",
			showDenyButton: true,
			confirmButtonText: "S�",
			denyButtonText: "No",
		}).then(result => {
			if (result.isConfirmed) {
				this.TemplateService.Delete(row.templateCode).subscribe(response => {
					Swal.fire("Information", `Reino con codigo <br/> <b> ${row.templateCode}</b>  <br/> ha sido eliminado correctamente`, "success");
					this.Search();
				});
			} else if (result.isDenied) {
			}
		});
	}
	SelectRow(row: TemplateSimpleResponse) {}
	RefreshList(): void {
		this.TemplatesFiler = this.Templates.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize);
	}
}
