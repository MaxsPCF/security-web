export interface RealmGroupCreateCommand {
	realmID: string;
	realmGroupName: string;
}

export interface RealmGroupUpdateCommand {
	realmGroupdID: string;
	realmID: string;
	realmGroupName: string;
}
