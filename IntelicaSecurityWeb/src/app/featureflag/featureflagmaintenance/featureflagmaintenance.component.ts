import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureFlagService } from '../feature-flag.service';
import { PageService } from '../../page/page.service';
import { FeatureFlag, FeatureFlagDetail } from '../featureFlag';
import { PageSimpleResponse } from '../../page/dto/pageResponses';
import { BusinessuserService } from '../../businessuser/businessuser.service';
import { BusinessUserSimpleResponse } from '../../businessuser/dto/businessUserResponses';
import Swal from 'sweetalert2';

@Component({
	selector: 'security-featureflagmaintenance',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
	templateUrl: './featureflagmaintenance.component.html'
})
export class FeatureflagmaintenanceComponent {
	FeatureFlagID: string = '';
	Read: boolean = false;
	FeatureFlag: FeatureFlag = new FeatureFlag();
	pages: PageSimpleResponse[] = [];
	users: BusinessUserSimpleResponse[] = [];
	usersSelected: string[] = [];
	private readonly router = inject(Router);
	private readonly featureFlagService = inject(FeatureFlagService);
	private readonly pageService = inject(PageService);
	private readonly businessUserService = inject(BusinessuserService);
	private activatedRoute = inject(ActivatedRoute);
	@ViewChild('RealmGroupForm', { read: NgForm }) RealmGroupForm: any;
	constructor() {
		this.pageService.GetAll().subscribe((response) => {
			this.pages = response;
		});

		this.businessUserService //.GetByAll().subscribe((response) => {
			.GetByFilter('', '', '')
			.subscribe((response) => {
				this.users = response;
			});

		this.FeatureFlagID = this.activatedRoute.snapshot.params['id'];
		if (this.FeatureFlagID != undefined && this.FeatureFlagID != null) {
			this.featureFlagService.Find(this.FeatureFlagID).subscribe((response) => {
				this.FeatureFlag = response;
				this.usersSelected = this.FeatureFlag.featureFlagDetails.map((x) => x.businessUserID);
			});
		}
	}
	@HostListener('window:keydown.alt.r', ['$event'])
	Back() {
		this.router.navigate(['security/featureflag/list']);
	}
	@HostListener('window:keydown.alt.s', ['$event'])
	Submit() {
		if (!this.RealmGroupForm.valid) {
			Swal.fire('Informacion', 'Complete los campos necesarios', 'error');
			return;
		}
		const userCrud: FeatureFlagDetail[] = [];
		const userAll = this.users;
		this.usersSelected.forEach(function (value: string) {
			let rowuser = userAll.find((x) => x.businessUserID == value);
			if (rowuser)
				userCrud.push({
					featureFlagID: '',
					featureFlagDetailID: '',
					businessUserID: rowuser.businessUserID
				});
		});
		this.FeatureFlag.featureFlagDetails = userCrud;
		if (this.FeatureFlagID != undefined && this.FeatureFlagID != null && this.FeatureFlagID != '') {
			this.featureFlagService.Update(this.FeatureFlag).subscribe((response) => {
				Swal.fire(
					'Informacion',
					`Feature Flag con codigo <br/> <b> ${response.featureFlagID}</b>  <br/> ha sido actualizado correctamente`,
					'success'
				);
				this.Back();
				this.Clean();
			});
		} else {
			this.featureFlagService.Create(this.FeatureFlag).subscribe((response) => {
				Swal.fire(
					'Informacion',
					`Feature Flag con codigo <br/> <b> ${response.featureFlagID}</b>  <br/> ha sido registrada correctamente`,
					'success'
				);
				this.Back();
				this.Clean();
			});
		}
	}
	Clean(): void {
		this.FeatureFlag = new FeatureFlag();
	}
}
