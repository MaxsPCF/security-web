import { Guid } from 'guid-typescript';
import { BusinessUserPageControl } from './businessUserPageControl';
import { BusinessUser } from './businessUser';
export class BusinessUserPage {
	businessUserPageID: string = Guid.EMPTY;
	businessUserID: string = Guid.EMPTY;
	PageID: string = Guid.EMPTY;
	businessUserPageCanUpdate: boolean = true;
	businessUserPageCanCreate: boolean = true;
	businessUserPageCanDelete: boolean = true;
	businessUserPageActive: boolean = true;
	businessUserPageControls: BusinessUserPageControl[] = [];
	businessUser: BusinessUser = new BusinessUser();
}
