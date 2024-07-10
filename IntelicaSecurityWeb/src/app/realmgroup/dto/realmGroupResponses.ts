export interface RealmGroupSimpleResponse {
	realmGroupID: string;
	realmName: string;
	realmGroupName: string;
}

export interface RealmGroupMaintenanceResponse {
	id: string;
}

export interface RealmGroupRoleSimpleResponse {
	realmGroupRoleID: string;
	realmGroupID: string;
	realmRoleId: string;
	realmRoleName: string;
}
