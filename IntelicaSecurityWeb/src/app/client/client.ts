import { Guid } from 'guid-typescript';

export class Client {
	clientCode: string = Guid.EMPTY;
	realmCode: string = '';
	clientId: string = '';
	clientName: string = '';
	constructor() {}
}
