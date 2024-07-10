export interface RealmRoleCreateCommand {
	realmID: string;
	realmRoleName: string;
	realmRoleDescription: string;
}

export interface RealmRoleUpdateCommand {
	realmRoleID: string;
	realmID: string;
	realmRoleName: string;
	realmRoleDescription: string;
}
