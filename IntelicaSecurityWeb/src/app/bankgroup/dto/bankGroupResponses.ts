export interface BankGroupSimpleResponse {
	bankGroupID: string;
	bankGroupName: string;
	bankGroupDatabase: string;
	bankGroupDetails: BankGroupDetailSimpleResponse[];
}

export interface BankGroupDetailSimpleResponse {
	bankGroupDetailID: string;
	bankGroupID: string;
	bankID: string;
}
