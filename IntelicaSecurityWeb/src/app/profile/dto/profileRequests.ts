import { GlobalConstants } from '../../common/constants/global.constants';

export class ProfileCommand {
	profileID: string;
	profileName: string;
	profileDescription: string;
	profilePages: ProfilePageCommand[];

	constructor() {
		this.profileID = GlobalConstants.GUID_EMPTY;
		this.profileName = '';
		this.profileDescription = '';
		this.profilePages = [];
	}
}

export class ProfilePageCommand {
	profilePageID: string;
	profileID: string;
	pageID: string;

	constructor() {
		this.profilePageID = GlobalConstants.GUID_EMPTY;
		this.profileID = GlobalConstants.GUID_EMPTY;
		this.pageID = GlobalConstants.GUID_EMPTY;
	}
}
