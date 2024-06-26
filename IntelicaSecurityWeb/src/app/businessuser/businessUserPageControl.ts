import { Guid } from 'guid-typescript';
import { BusinessUserPage } from './businessuserpage';

export class BusinessUserPageControl {
	businessUserPageControlID: string = Guid.EMPTY;
	businessUserPageID: string = Guid.EMPTY;
	controlID: string = Guid.EMPTY;
	businessUserPageControlActive: boolean = true;
	businessUserPage: BusinessUserPage = new BusinessUserPage();
}
