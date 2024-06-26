import { Guid } from 'guid-typescript';

export class RealmGroup {
	realmGroupCode: string = Guid.EMPTY;
	realmCode: string = '';
	realmGroupName: string = '';
	realmGroupRoles: RealmGroupRoles[] = [];
	constructor() {}
}
export class RealmGroupRoles {
	realmGroupRoleId: string = Guid.EMPTY;
	realmGroupCode: string = '';
	realmRoleId: string = '';
	realmRoleName: string = '';
	realmRoleDescription: string = '';
	constructor() {}
}
