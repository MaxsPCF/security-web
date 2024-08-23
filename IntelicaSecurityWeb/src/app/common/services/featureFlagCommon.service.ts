import { Injectable, signal } from "@angular/core";
import { FeatureFlagService } from "../../featureflag/featureflag.service";
import { FeatureFlagSimpleResponse } from "../../featureflag/dto/featureFlagResponses";
@Injectable({ providedIn: "root" })
export default class CommonFeatureFlagService {
	private FeatureFlags: FeatureFlagSimpleResponse[] = [];
	private pageRoot: string = "";
	IsReady = signal<boolean>(false);
	constructor(private featureFlagDataService: FeatureFlagService) {}
	Initialize(pageRoot: string): void {
		this.featureFlagDataService.GetByPageRoot(pageRoot).subscribe(response => {
			this.pageRoot = pageRoot;
			this.FeatureFlags = response;
			this.IsReady.set(true);
		});
	}
	Exists(featureFlagName: string): boolean {
		return !(this.FeatureFlags.find(x => x.featureFlagName == featureFlagName) == null);
	}
	Refresh(): void {
		console.log("Refresh");
		this.Initialize(this.pageRoot);
	}
	GetPageRoot(): string {
		return this.pageRoot;
	}
}