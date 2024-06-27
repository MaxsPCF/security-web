import Swal from "sweetalert2";
import { Component, ViewChild, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { Realm } from "../../realm/realm";
import { BusinessUser } from "../businessUser";
import { ProfileSimpleResponses } from "../../profile/dto/profileResponses";
import { ProfileService } from "../../profile/profile.service";
import { RealmService } from "../../realm/realm.service";
import { BusinessuserService } from "../businessuser.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RealmGroupService } from "../../group/realmGroup.service";
import { RealmGroupSimpleResponse } from "../../group/dto/realmGroupResponses";
import { PageService } from "../../page/page.service";
import { PageSimpleResponse } from "../../page/dto/pageResponses";
@Component({
	selector: "security-businessusermaintenance",
	standalone: true,
	imports: [NgSelectModule, FormsModule],
	templateUrl: "./businessusermaintenance.component.html",
})
export class BusinessusermaintenanceComponent {
	private readonly realmService = inject(RealmService);
	private readonly profileService = inject(ProfileService);
	private readonly businessUserService = inject(BusinessuserService);
	private readonly realmGroupService = inject(RealmGroupService);
	private readonly pageService = inject(PageService);
	private readonly router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	businessUserID: string = "";
	BusinessUser: BusinessUser = new BusinessUser();
	realms: Realm[] = [];
	realmGroups: RealmGroupSimpleResponse[] = [];
	profiles: ProfileSimpleResponses[] = [];
	pages: PageSimpleResponse[] = [];
	businessUserRealmGroups: string[] = [];
	@ViewChild("businessuserForm", { read: NgForm }) businessuserForm: any;
	ngOnInit() {
		this.realmService.GetAll().subscribe(response => {
			this.realms = response;
		});

		this.profileService.GetAll().subscribe(response => {
			this.profiles = response;
		});

		this.pageService.GetAll().subscribe(response => {
			this.pages = response;
			console.log(response);
		});

		this.businessUserID = this.activatedRoute.snapshot.params["id"];
		if (this.businessUserID != undefined && this.businessUserID != null) {
			this.businessUserService.FindDetails(this.businessUserID).subscribe(response => {
				console.log(response);
				this.BusinessUser = response;
				this.businessUserRealmGroups = response.businessUserRealmGroups.map(d => d.realmGroupID);
				this.RealmGroupsByRealm(response.realmID);
			});
		}
	}
	Back() {
		this.router.navigate(["security/businessuser/list"]);
	}
	Submit() {
		if (!this.businessuserForm.valid) {
			Swal.fire("Informacion", "Complete los campos necesarios", "error");
			return;
		}
		this.BusinessUser.businessUserRealmGroups = this.businessUserRealmGroups.map(element => {
			return {
				businessUserID: this.BusinessUser.realmID,
				realmGroupID: element,
			};
		});
		if (this.businessUserID != undefined && this.businessUserID != null && this.businessUserID != "") {
			console.log(this.BusinessUser);
			this.businessUserService.Update(this.BusinessUser).subscribe(response => {
				Swal.fire("Informacion", `Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido actualizado correctamente`, "success");
				this.Back();
				this.Clean();
			});
		} else {
			console.log(this.BusinessUser);
			this.businessUserService.Create(this.BusinessUser).subscribe(response => {
				Swal.fire("Informacion", `Business user con codigo <br/> <b> ${response.businessUserID}</b>  <br/> ha sido registrada correctamente`, "success");
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.BusinessUser = new BusinessUser();
	}
	ChangeRealm(e: any) {
		console.log(e);
		this.RealmGroupsByRealm(e.realmCode);
	}
	RealmGroupsByRealm(realmID: string) {
		this.realmGroupService.GetByFilter(realmID, "", "").subscribe(response => {
			this.realmGroups = response;
		});
	}
}