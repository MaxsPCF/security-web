import { Guid } from 'guid-typescript';

export class Realm {
	realmID: string = Guid.EMPTY;
	realmName: string = '';
	constructor() {}
}
