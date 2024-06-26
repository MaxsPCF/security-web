import { Guid } from 'guid-typescript';

export class ClientScope {
	clientScopeID: string = Guid.EMPTY;
	realmID: string = '';
	clientScopeName: string = '';
	clientScopeDescription: string = '';
	constructor() {}
}
