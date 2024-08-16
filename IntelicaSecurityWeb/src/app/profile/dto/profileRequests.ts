import { Guid } from 'guid-typescript';
// import { GlobalConstants } from '../../common/constants/global.constants';

export class ProfileCommand {
	profileID: string;
	profileName: string;
	profileDescription: string;
	profilePages: ProfilePageCommand[];

	constructor() {
		this.profileID = Guid.EMPTY;
		this.profileName = '';
		this.profileDescription = '';
		this.profilePages = [];
	}
}

export class ProfilePageCommand {
	profilePageID: string;
	profileID: string;
	pageID: string;
	profilePageCanUpdate: boolean;
	profilePageCanCreate: boolean;
	profilePageCanDelete: boolean;

	constructor() {
		this.profilePageID = Guid.EMPTY;
		this.profileID = Guid.EMPTY;
		this.pageID = Guid.EMPTY;
		this.profilePageCanUpdate = false;
		this.profilePageCanCreate = false;
		this.profilePageCanDelete = false;
	}
}
