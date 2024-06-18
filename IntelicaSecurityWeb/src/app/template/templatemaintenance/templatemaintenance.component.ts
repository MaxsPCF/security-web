import Swal from "sweetalert2";
import { Component, HostListener, ViewChild, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { TemplateService } from "../template.service";
import { Template } from "../template";
@Component({
	selector: "security-templatemaintenance",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: "./templatemaintenance.component.html",
})
export class TemplatemaintenanceComponent {
	private readonly router = inject(Router);
	private readonly TemplateService = inject(TemplateService);
	private activatedRoute = inject(ActivatedRoute);
	Template: Template = new Template();
	TemplateCode: string = "";
	Read: boolean = false;
	@ViewChild("TemplateForm", { read: NgForm }) TemplateForm: any;
	ngOnInit() {
		this.TemplateCode = this.activatedRoute.snapshot.params["id"];
		this.Read = this.activatedRoute.snapshot.params["read"];
		if (this.TemplateCode != undefined && this.TemplateCode != null) {
			this.TemplateService.Find(this.TemplateCode).subscribe(response => {
				this.Template = response;
			});
		}
		if (this.TemplateCode == undefined && this.TemplateCode == null) this.Read = false ;
	}
	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/template/list"]);
	}
	@HostListener("window:keydown.alt.s", ["$event"])
	Submit() {
		if (!this.TemplateForm.valid) {
			Swal.fire("Information", "Complete the necessary fields", "error");
			return;
		}
		if (this.TemplateCode != undefined && this.TemplateCode != null && this.TemplateCode != "") {
			this.TemplateService.Update(this.Template).subscribe(response => {
				Swal.fire("Information", `Realm with code <br/> <b> ${response.templateCode}</b>  <br/> has been successfully updated.`, "success");
				this.Back();
				this.Clean();
			});
		} else {
			this.TemplateService.Create(this.Template).subscribe(response => {
				Swal.fire("Information", `Realm with code <br/> <b> ${response.templateCode}</b>  <br/> has been successfully registered`, "success");
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.Template = new Template();
	}
}
