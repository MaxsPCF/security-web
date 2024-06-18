import { Guid } from 'guid-typescript';

export class RealmRole {
	realmRoleId: string = Guid.EMPTY;
	realmCode: string = '';
	realmRoleName: string = '';
	realmRoleDescription: string = '';
	constructor() {}
}
