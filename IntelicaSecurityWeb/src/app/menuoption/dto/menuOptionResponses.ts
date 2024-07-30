export interface MenuOptionSimpleResponses {
	menuOptionID: string;
	menuOptionParentID: string;
	menuOptionName: string;
	menuOptionDescription: string;
	menuOptionOrder: number;
	menuOptionShow: boolean;
	menuOptionIcon: string;
	menuOptionPages: MenuOptionPageSimpleResponses[];
}

export interface MenuOptionPageSimpleResponses {
	menuOptionPageID: string;
	menuOptionID: string;
	pageID: string;
	pageName: string;
	menuOptionPageOrder: number;
}

export interface MenuOptionParentResponses {
	menuOptionID: string;
	menuOptionName: string;
}
