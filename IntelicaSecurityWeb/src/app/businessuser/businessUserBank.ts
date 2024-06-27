import { Guid } from 'guid-typescript';
import { BusinessUser } from './businessUser';
export class BusinessUserBank {
	businessUserBankID: string = Guid.EMPTY;
	bankID: string = Guid.EMPTY;
	businessUserID: string = Guid.EMPTY;
	businessUser: BusinessUser = new BusinessUser();
	constructor() {}
}