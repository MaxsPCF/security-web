import { GlobalConstants } from '../../common/constants/global.constants';

export class PageCommand {
  pageID: string;
  pageName: string;
  pageUrl: string;

  constructor() {
    this.pageID = GlobalConstants.GUID_EMPTY;
    this.pageName = '';
    this.pageUrl = '';
  }
}
