import { Guid } from 'guid-typescript';

export class RealmGroup {
	realmGroupId: string = Guid.EMPTY;
	realmId: string = '';
	realmGroupName: string = '';
	realmGroupRoles: RealmGroupRoles[] = [];
	constructor() {}
}
export class RealmGroupRoles {
	realmGroupRoleId: string = Guid.EMPTY;
	realmGroupId: string = '';
	realmRoleId: string = '';
	realmRoleName: string = '';
	realmRoleDescription: string = '';
	constructor() {}
}
