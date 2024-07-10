import { Guid } from 'guid-typescript';

export class RealmGroup {
	realmGroupID: string = Guid.EMPTY;
	realmID: string = '';
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
