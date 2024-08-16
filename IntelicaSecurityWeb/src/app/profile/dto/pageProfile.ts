import { Guid } from 'guid-typescript';

export class Profile {
	profileID: string;
	profileName: string;
	profileDescription: string;
	profilePages: PageProfile[];

	constructor() {
		this.profileID = Guid.EMPTY;
		this.profileName = '';
		this.profileDescription = '';
		this.profilePages = [];
	}
}

export class PageProfile {
	pageId: string;
	pageName: string;
	profilePageCanUpdate: boolean;
	profilePageCanCreate: boolean;
	profilePageCanDelete: boolean;
	isSelect: boolean;

	constructor() {
		this.pageId = Guid.EMPTY;
		this.pageName = '';
		this.profilePageCanUpdate = false;
		this.profilePageCanCreate = false;
		this.profilePageCanDelete = false;
		this.isSelect = false;
	}
}
