import { Guid } from 'guid-typescript';

export interface MenuOptionFilter {
	menuOptionParentID: string | any;
	menuOptionName: string;
}

export class MenuOptionCommands {
	menuOptionID: string;
	menuOptionParentID?: string | any;
	menuOptionName: string;
	menuOptionDescription: string;
	menuOptionOrder: number;
	menuOptionShow: boolean;
	menuOptionIcon?: string | any;
	menuOptionPages: MenuOptionPageCommands[];

	constructor() {
		this.menuOptionID = Guid.EMPTY;
		this.menuOptionParentID = null;
		this.menuOptionName = '';
		this.menuOptionDescription = '';
		this.menuOptionOrder = 0;
		this.menuOptionShow = false;
		this.menuOptionIcon = null;
		this.menuOptionPages = [];
	}
}

export class MenuOptionPageCommands {
	menuOptionPageID: string;
	menuOptionID: string;
	pageID: string;
	pageName: string;
	menuOptionPageOrder: number;

	constructor() {
		this.menuOptionPageID = Guid.EMPTY;
		this.menuOptionID = Guid.EMPTY;
		this.pageID = Guid.EMPTY;
		this.pageName = '';
		this.menuOptionPageOrder = 0;
	}
}
