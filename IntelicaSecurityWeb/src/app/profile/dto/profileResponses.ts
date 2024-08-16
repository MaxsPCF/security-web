export interface ProfileSimpleResponses {
	profileID: string;
	profileName: string;
	profileDescription: string;
	profilePages: ProfilePageSimpleResponses[];
}

export interface ProfilePageSimpleResponses {
	profilePageID: string;
	profileID: string;
	pageID: string;
	pageName: string;
	profilePageCanUpdate: boolean;
	profilePageCanCreate: boolean;
	profilePageCanDelete: boolean;
}

export interface ProfileCreateResponses {
	profileID: string;
}
