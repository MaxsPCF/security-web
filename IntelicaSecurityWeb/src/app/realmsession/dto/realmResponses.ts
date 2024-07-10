export interface RealmSessionSimpleResponse {
	id: string;
	realmID: string;
	realmName: string;
	username: string;
	userid: string;
	ipAddress: string;
	start: Date;
	lastAccess: Date;
	transientUser: boolean;
	type: string;
}
