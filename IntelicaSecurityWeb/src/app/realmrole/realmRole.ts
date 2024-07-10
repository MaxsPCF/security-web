import { Guid } from 'guid-typescript';

export class RealmRole {
	realmRoleID: string = Guid.EMPTY;
	realmID: string = '';
	realmRoleName: string = '';
	realmRoleDescription: string = '';
	constructor() {}
}
