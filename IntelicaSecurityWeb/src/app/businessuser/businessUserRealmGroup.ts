import { Guid } from 'guid-typescript';
export class BusinessUserRealmGroup {
	businessUserID: string = Guid.EMPTY;
	realmGroupID: string = Guid.EMPTY;
	constructor() {}
}