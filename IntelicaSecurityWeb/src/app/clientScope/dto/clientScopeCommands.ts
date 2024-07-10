export interface ClientScopeCreateCommand {
	realmID: string;
	clientID: string;
	clientName: string;
}

export interface ClientScopeUpdateCommand {
	clientID: string;
	realmID: string;
	clientId: string;
	clientName: string;
}
