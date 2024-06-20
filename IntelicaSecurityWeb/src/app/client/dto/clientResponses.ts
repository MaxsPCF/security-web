export interface ClientSimpleResponse {
	clientCode: string;
	realmName: string;
	clientId: string;
	clientName: string;
	clientRootUrl: string;
	clientRedirectUrl: string;
	clientWebOrigin: string;
}

export interface ClientMaintenanceResponse {
	clientCode: string;
}
