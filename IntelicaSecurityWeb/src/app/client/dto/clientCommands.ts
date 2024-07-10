export interface ClientCreateCommand {
	realmID: string;
	clientID: string;
	clientName: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}

export interface ClientUpdateCommand {
	clientID: string;
	realmID: string;
	clientId: string;
	clientName: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}
