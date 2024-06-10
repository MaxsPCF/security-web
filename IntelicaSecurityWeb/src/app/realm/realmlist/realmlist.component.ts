import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { RealmSimpleResponse } from "../dto/realmResponses";
import { RealmService } from "../realm.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
	selector: "security-realmlist",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: "./realmlist.component.html",
})
export class RealmlistComponent {
	RealmCode: string = "";
	RealmName: string = "";
	Realms: RealmSimpleResponse[] = [];
	private readonly realmService = inject(RealmService);
	private readonly router = inject(Router);

	Home() {}
	Search() {
		this.realmService.GetByFilter(this.RealmCode, this.RealmName).subscribe(response => {
			this.Realms = response;
		});
	}
	Add() {
		this.router.navigate(["security/realm/maintenance"])
	}
	Export() {}
	EditRow(row: RealmSimpleResponse) {}
	DeleteRow(row: RealmSimpleResponse) {}
	SelectRow(row: RealmSimpleResponse) {}
}