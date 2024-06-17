export interface ProfileSimpleResponses {
	profileID: string;
	profileName: string;
	profileDescription: string;
	active: boolean;
	profilePages: ProfilePageSimpleResponses[];
}

export interface ProfilePageSimpleResponses {
	profilePageID: string;
	profileID: string;
	pageID: string;
	active: boolean;
}

export interface ProfileCreateResponses {
	profileID: string;
}
