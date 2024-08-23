export interface MenuOptionResponse {
	menuID: string;
	nameMenu: string;
	orderMenu: number;
	icon: string;
	url: string;
	isMenuParent: boolean;
	subMenuOptions: MenuOptionResponse[];
}