export interface BusinessUserSimpleResponses {
	businessUserID: string;
	profileID: string;
	realmID: string;
	businessUserName: string;
	businessUserFirstName: string;
	businessUserLastName: string;
	businessUserEmail: string;
	businessUserPassword: string;
	businessUserPages: BusinessUserPageResponses[];
	businessUserBanks: BusinessUserBankResponses[];
	businessUserBankGroups: BusinessUserBankGroupResponses[];
}

export interface BusinessUserResponse {
	businessUserID: string;
	profileID: string;
	realmID: string;
	businessUserName: string;
	businessUserFirstName: string;
	businessUserLastName: string;
	businessUserEmail: string;
	businessUserPassword: string;
	businessUserPhoto?: string;
	businessUserPages: BusinessUserPageResponses[];
	businessUserBanks: BusinessUserBankResponses[];
	businessUserBankGroups: BusinessUserBankGroupResponses[];
}

export interface BusinessUserPageResponses {
	businessUserPageID: string;
	pageID: string;
	businessUserCanUpdate: boolean;
	businessUserCanCreate: boolean;
	businessUserCanDelete: boolean;
}

export interface BusinessUserBankResponses {
	businessUserBankID: string;
	bankID: string;
}

export interface BusinessUserBankGroupResponses {
	businessUserBankGroupID: string;
	bankGroupID: string;
}

export interface BusinessUserMaintenanceResponse {
	businessUserID: string;
}

export interface BusinessUserSimpleResponse {
	businessUserID: string;
	profileName: string;
	realmID: string;
	businessUserName: string;
	businessUserFirstName: string;
	businessUserLastName: string;
	businessUserEmail: string;
}

export class BusinessUserPage {
	businessUserPageID: string;
	pageID: string;
	pageName: string;
	businessUserCanUpdate: boolean;
	businessUserCanCreate: boolean;
	businessUserCanDelete: boolean;
	// isSelect: boolean;

	constructor() {
		this.businessUserPageID = "";
		this.pageID = "";
		this.pageName = "";
		this.businessUserCanUpdate = false;
		this.businessUserCanCreate = false;
		this.businessUserCanDelete = false;
		// this.isSelect = false;
	}
}

export class BusinessUserBank {
	businessUserBankID: string;
	bankID: string;
	bankName: string;
	// isSelect: boolean;

	constructor() {
		this.businessUserBankID = "";
		this.bankID = "";
		this.bankName = "";
		// this.isSelect = false;
	}
}

export class BusinessUserBankGroup {
	businessUserBankGroupID: string;
	bankGroupID: string;
	bankGroupName: string;
	// isSelect: boolean;

	constructor() {
		this.businessUserBankGroupID = "";
		this.bankGroupID = "";
		this.bankGroupName = "";
		// this.isSelect = false;
	}
}
