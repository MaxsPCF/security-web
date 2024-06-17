import { Guid } from 'guid-typescript';

export class RealmGroup {
	realmGroupCode: string = Guid.EMPTY;
	realmCode: string = '';
	realmGroupName: string = '';
	constructor() {}
}
