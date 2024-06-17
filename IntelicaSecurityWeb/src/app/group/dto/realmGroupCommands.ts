export interface RealmGroupCreateCommand {
	realmCode: string;
	realmGroupName: string;
}

export interface RealmGroupUpdateCommand {
	realmGroupCode: string;
	realmCode: string;
	realmGroupName: string;
}
