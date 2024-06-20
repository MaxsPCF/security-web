export interface ClientCreateCommand {
	realmCode: string;
	clientId: string;
	clientName: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}

export interface ClientUpdateCommand {
	clientCode: string;
	realmCode: string;
	clientId: string;
	clientName: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}
