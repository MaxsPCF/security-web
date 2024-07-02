import { Guid } from 'guid-typescript';
import { BusinessUser } from './businessUser';
export class BusinessUserBankGroup {
	bussinessUserBankGroupID: string = Guid.EMPTY;
	bankGroupId: string = Guid.EMPTY;
	businessUserID: string = Guid.EMPTY;
	businessUserBankGroupActive: boolean = false;
	businessUser: BusinessUser = new BusinessUser();

	constructor() {}
}
