import { Guid } from 'guid-typescript';

export class BusinessUserPageRequest {
	businessUserPageID: string;
	PageID: string;
	businessUserPageCanUpdate: boolean;
	businessUserPageCanCreate: boolean;
	businessUserPageCanDelete: boolean;

	constructor() {
		this.businessUserPageID = Guid.EMPTY;
		this.PageID = Guid.EMPTY;
		this.businessUserPageCanUpdate = true;
		this.businessUserPageCanCreate = true;
		this.businessUserPageCanDelete = true;
	}
}
