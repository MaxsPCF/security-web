import { Guid } from 'guid-typescript';

export class FeatureFlag {
	featureFlagID: string = Guid.EMPTY;
	pageID: string = Guid.EMPTY;
	featureFlagName: string = '';
	allUser: boolean = false;
	status: boolean = false;
	featureFlagDetails: FeatureFlagDetail[] = [];
	constructor() {}
}

export class FeatureFlagDetail {
	featureFlagDetailID: string = Guid.EMPTY;
	featureFlagID: string = Guid.EMPTY;
	businessUserID: string = Guid.EMPTY;
}
