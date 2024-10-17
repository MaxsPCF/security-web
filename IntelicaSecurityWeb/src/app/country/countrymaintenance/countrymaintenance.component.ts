import { Component, HostListener, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { Country } from "../country";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { CountryService } from "../country.service";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "security-countrymaintenance",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbTooltipModule],
	templateUrl: "./countrymaintenance.component.html",
})
export class CountrymaintenanceComponent implements OnInit {
	private readonly countryService = inject(CountryService);
	private readonly router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);

	Country: Country = new Country();
	@ViewChild("countryForm", { read: NgForm }) countryForm: any;
	countryid: string = "";
	IsEdit: boolean = false;
	Read: boolean = false;

	ngOnInit(): void {
		this.countryid = this.activatedRoute.snapshot.params["id"];
		this.Read = this.activatedRoute.snapshot.params["read"];
		this.IsEdit = this.countryid != undefined && this.countryid != null;
		if (this.countryid != undefined && this.countryid != null) {
			this.countryService.Find(this.countryid).subscribe(response => {
				this.Country = response;
			});
		}
	}

	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/country/list"]);
	}

	@HostListener("window:keydown.alt.s", ["$event"])
	Submit() {
		if (!this.countryForm.valid) {
			Swal.fire("Information", "Complete the required fields.", "error");
			return;
		}
		if (this.countryid != undefined && this.countryid != null) {
			this.countryService.Update(this.Country).subscribe(response => {
				Swal.fire("Information", `Country with code <br/> <b> ${response.countryID}</b>  <br/> has been successfully updated`, "success");
				this.Back();
				this.Clean();
			});
		} else {
			this.countryService.Create(this.Country).subscribe(response => {
				Swal.fire("Information", `Country with code <br/> <b> ${response.countryID}</b>  <br/> has been successfully registered`, "success");
				this.Back();
				this.Clean();
			});
		}
	}

	@HostListener("window:keydown.alt.c", ["$event"])
	Clean(): void {
		if (this.countryid != undefined && this.countryid != null) {
			this.countryService.Find(this.countryid).subscribe(response => {
				this.Country = response;
			});
		} else this.Country = new Country();
	}
}
