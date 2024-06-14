export interface ClientCreateCommand {
	realmCode: string;
	clientId: string;
	clientName: string;
}

export interface ClientUpdateCommand {
	clientCode: string;
	realmCode: string;
	clientId: string;
	clientName: string;
}
