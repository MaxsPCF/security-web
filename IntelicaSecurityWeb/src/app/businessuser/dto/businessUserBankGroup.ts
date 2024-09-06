import { Guid } from 'guid-typescript';

export class BusinessUserBankGroupRequest {
	bussinessUserBankGroupID: string;
	bankGroupId: string;

	constructor() {
		this.bussinessUserBankGroupID = Guid.EMPTY;
		this.bankGroupId = Guid.EMPTY;
	}
}
