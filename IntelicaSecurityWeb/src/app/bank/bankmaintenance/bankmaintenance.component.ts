import Swal from "sweetalert2";
import { Component, HostListener, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { Bank } from "../bank";
import { ActivatedRoute, Router } from "@angular/router";
import { BankService } from "../bank.service";
import { CountrySimpleResponse } from "../../country/dto/countryResponses";
import { CountryService } from "../../country/country.service";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "security-bankmaintenance",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule, NgbTooltipModule],
	templateUrl: "./bankmaintenance.component.html",
})
export class BankmaintenanceComponent implements OnInit {
	bankid: string = "";
	Read: boolean = false;
	Countries: CountrySimpleResponse[] = [];
	Bank: Bank = new Bank();
	private readonly bankService = inject(BankService);
	private readonly countryService = inject(CountryService);
	private readonly router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	@ViewChild("bankForm", { read: NgForm }) bankForm: any;

	ngOnInit(): void {
		this.countryService.GetByAll().subscribe(response1 => {
			this.Countries = response1;
			this.bankid = this.activatedRoute.snapshot.params["id"];
			this.Read = this.activatedRoute.snapshot.params["read"];
			if (this.bankid != undefined && this.bankid != null) {
				this.bankService.Find(this.bankid).subscribe(response => {
					this.Bank = response;
				});
			}
		});
	}

	@HostListener("window:keydown.alt.r", ["$event"])
	Back() {
		this.router.navigate(["security/bank/list"]);
	}

	@HostListener("window:keydown.alt.s", ["$event"])
	Submit() {
		if (!this.bankForm.valid) {
			Swal.fire("Information", "Complete the required fields.", "error");
			return;
		}
		if (this.bankid != undefined && this.bankid != null) {
			this.bankService.Update(this.Bank).subscribe(response => {
				Swal.fire("Information", `Bank with code <br/> <b> ${response.bankID}</b>  <br/> has been successfully updated`, "success");
				this.Back();
				this.Clean();
			});
		} else {
			this.bankService.Create(this.Bank).subscribe(response => {
				Swal.fire("Information", `Bank with code <br/> <b> ${response.bankID}</b>  <br/> has been successfully registered`, "success");
				this.Back();
				this.Clean();
			});
		}
	}

	@HostListener("window:keydown.alt.c", ["$event"])
	Clean(): void {
		if (this.bankid != undefined && this.bankid != null) {
			this.bankService.Find(this.bankid).subscribe(response => {
				this.Bank = response;
			});
		} else this.Bank = new Bank();
	}
}
