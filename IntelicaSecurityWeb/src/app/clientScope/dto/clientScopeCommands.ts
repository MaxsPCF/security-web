export interface ClientScopeCreateCommand {
	realmCode: string;
	clientId: string;
	clientName: string;
}

export interface ClientScopeUpdateCommand {
	clientCode: string;
	realmCode: string;
	clientId: string;
	clientName: string;
}
