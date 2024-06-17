import Swal from "sweetalert2";
import { Component, ViewChild, inject } from "@angular/core";
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
	TemplateCode: string = '';
	@ViewChild('TemplateForm', { read: NgForm }) TemplateForm: any;
	ngOnInit() {
		this.TemplateCode = this.activatedRoute.snapshot.params['id'];
		console.log(this.TemplateCode);
		if (this.TemplateCode != undefined && this.TemplateCode != null) {
			this.TemplateService.Find(this.TemplateCode).subscribe((response) => {
				this.Template = response;
			});
		}
	}
	GetRows() {}
	Home() {}
	Back() {
		this.router.navigate(['security/Template/list']);
	}
	Submit() {
		if (!this.TemplateForm.valid) {
			Swal.fire('Information', 'Complete los campos necesarios', 'error');
			return;
		}
		if (this.TemplateCode != undefined && this.TemplateCode != null && this.TemplateCode != '') {
			this.TemplateService.Update(this.Template).subscribe((response) => {
				Swal.fire('Information', `Reino con codigo <br/> <b> ${response.templateCode}</b>  <br/> ha sido actualizado correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		} else {
			this.TemplateService.Create(this.Template).subscribe((response) => {
				Swal.fire('Information', `Reino con codigo <br/> <b> ${response.templateCode}</b>  <br/> ha sido registrada correctamente`, 'success');
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.Template = new Template();
	}
}
