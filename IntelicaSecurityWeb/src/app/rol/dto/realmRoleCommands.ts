export interface RealmRoleCreateCommand {
	realmId: string;
	realmRoleName: string;
	realmRoleDescription: string;
}

export interface RealmRoleUpdateCommand {
	realmRoleId: string;
	realmId: string;
	realmRoleName: string;
	realmRoleDescription: string;
}
