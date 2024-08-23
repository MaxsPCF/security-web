export interface FeatureFlagSimpleResponse {
	featureFlagID: string;
	pageID: string;
	pageName: string;
	featureFlagName: string;
	allUser: boolean;
	status: boolean;
	featureFlagDetails: FeatureFlagDetailSimpleResponse[];
}
export interface FeatureFlagDetailSimpleResponse {
	featureFlagDetailID: string;
	featureFlagID: string;
	businessUserID: string;
}
export interface FeatureFlagMaintenanceResponse {
	featureFlagID: string;
}