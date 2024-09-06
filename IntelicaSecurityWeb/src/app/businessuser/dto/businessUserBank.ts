import { Guid } from 'guid-typescript';

export class BusinessUserBankRequest {
	businessUserBankID: string;
	bankID: string;

	constructor() {
		this.businessUserBankID = Guid.EMPTY;
		this.bankID = Guid.EMPTY;
	}
}
