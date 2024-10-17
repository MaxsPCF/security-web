import { GlobalConstants } from "../../common/constants/global.constants";

export class PageCommand {
	pageID: string;
	pageName: string;
	pageUrl: string;
	pageIcon: string;
	pageRoot: string;
	pageShowMenu: boolean;

	constructor() {
		this.pageID = GlobalConstants.GUID_EMPTY;
		this.pageName = "";
		this.pageUrl = "";
		this.pageIcon = "";
		this.pageRoot = "";
		this.pageShowMenu = true;
	}
}
