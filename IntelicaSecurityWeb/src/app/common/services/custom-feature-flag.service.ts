import { Injectable } from '@angular/core';
import { FeatureFlagService } from '../../featureflag/feature-flag.service';
import { FeatureFlagSimpleResponse } from '../../featureflag/dto/featureFlagResponses';

@Injectable({ providedIn: 'root' })
export class CustomFeatureFlagService {
	private _featureFlags: FeatureFlagSimpleResponse[] = []; // A list of all features turned ON
	private _initialized = false;

	constructor(private featureFlagDataService: FeatureFlagService) {
		this.initialize();
	}

	featureOff(featureName: string) {
		return !this.featureOn(featureName);
	}

	featureOn(featureName: string) {
		if (!featureName) {
			return true;
		}
		// Find the feature flag that is turned on
		return (
			this._featureFlags &&
			!!this._featureFlags.find((feature) => {
				return feature.featureFlagName == featureName && feature.status;
			})
		);
		// if feature not found, default to turned off
	}

	get initialized() {
		return this._initialized;
	}

	initialize() {
		this._featureFlags = [];
		// Call API to retrieve the list of features and their state
		this.featureFlagDataService.getFeatureFlags().subscribe((featureFlags) => {
			this._featureFlags = featureFlags;
			this._initialized = true;
		});
	}
}
