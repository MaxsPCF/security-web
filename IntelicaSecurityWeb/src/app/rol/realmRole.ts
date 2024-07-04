import { Guid } from 'guid-typescript';

export class RealmRole {
	realmRoleId: string = Guid.EMPTY;
	realmId: string = '';
	realmRoleName: string = '';
	realmRoleDescription: string = '';
	constructor() {}
}
