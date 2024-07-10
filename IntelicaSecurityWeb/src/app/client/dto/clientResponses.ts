export interface ClientSimpleResponse {
	clientID: string;
	realmID: string;
	realmName: string;
	clientName: string;
	clientDescription: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}

export interface ClientMaintenanceResponse {
	clientID: string;
}
