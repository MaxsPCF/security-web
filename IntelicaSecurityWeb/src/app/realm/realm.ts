import { Guid } from 'guid-typescript';

export class Realm {
	realmCode: string = Guid.EMPTY;
	realmName: string = '';
	constructor() {}
}
