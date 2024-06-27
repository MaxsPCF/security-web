import { Guid } from 'guid-typescript';
import { BusinessUserBank } from './businessUserBank';
import { BusinessUserBankGroup } from './businessUserBankGroup';
import { BusinessUserRealmGroup } from './businessUserRealmGroup';
import { BusinessUserPage } from './businessUserPage';
export class BusinessUser {
	businessUserID: string = Guid.EMPTY;
	realmID: string = Guid.EMPTY;
	profileID: string = Guid.EMPTY;
	businessUserName: string = '';
	businessUserFirstName: string = '';
	businessUserLastName: string = '';
	businessUserEmail: string = '';
	businessUserPassword: string = '';
	businessUserActive: boolean = true;
	businessUserPages: BusinessUserPage[] = [];
	businessUserBanks: BusinessUserBank[] = [];
	businessUserBankGroups: BusinessUserBankGroup[] = [];
	businessUserRealmGroups: BusinessUserRealmGroup[] = [];
	constructor() {}
}