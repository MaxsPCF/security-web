import { Guid } from 'guid-typescript';
import { BusinessUserBankRequest } from './businessUserBank';
import { BusinessUserBankGroupRequest } from './businessUserBankGroup';
import { BusinessUserPageRequest } from './businessUserPage';

export class BusinessUserRequest {
	businessUserID: string;
	profileID: string | any;
	businessUserName: string;
	businessUserFirstName: string;
	businessUserLastName: string;
	businessUserEmail: string;
	businessUserPassword: string;
	businessUserPages: BusinessUserPageRequest[];
	businessUserBanks: BusinessUserBankRequest[];
	businessUserBankGroups: BusinessUserBankGroupRequest[];

	constructor() {
		this.businessUserID = Guid.EMPTY;
		this.profileID = null;
		this.businessUserName = '';
		this.businessUserFirstName = '';
		this.businessUserLastName = '';
		this.businessUserEmail = '';
		this.businessUserPassword = '';
		this.businessUserPages = [];
		this.businessUserBanks = [];
		this.businessUserBankGroups = [];
	}
}
