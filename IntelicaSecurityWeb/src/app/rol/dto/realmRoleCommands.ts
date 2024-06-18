export interface RealmRoleCreateCommand {
	realmCode: string;
	realmRoleName: string;
	realmRoleDescription: string;
}

export interface RealmRoleUpdateCommand {
	realmRoleCode: string;
	realmCode: string;
	realmRoleName: string;
	realmRoleDescription: string;
}
