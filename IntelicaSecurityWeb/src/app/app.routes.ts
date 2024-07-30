import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { RealmlistComponent } from './realm/realmlist/realmlist.component';
import { RealmmaintenanceComponent } from './realm/realmmaintenance/realmmaintenance.component';
import { BanklistComponent } from './bank/banklist/banklist.component';
import { BankmaintenanceComponent } from './bank/bankmaintenance/bankmaintenance.component';
import { CountrylistComponent } from './country/countrylist/countrylist.component';
import { CountrymaintenanceComponent } from './country/countrymaintenance/countrymaintenance.component';
import { PagelistComponent } from './page/pagelist/pagelist.component';
import { PagemaintenanceComponent } from './page/pagemaintenance/pagemaintenance.component';
import { ClientlistComponent } from './client/clientlist/clientlist.component';
import { ClientmaintenanceComponent } from './client/clientmaintenance/clientmaintenance.component';
import { ProfilelistComponent } from './profile/profilelist/profilelist.component';
import { ProfilemaintenanceComponent } from './profile/profilemaintenance/profilemaintenance.component';
import { ClientscopelistComponent } from './clientScope/clientscopelist/clientscopelist.component';
import { ClientscopemaintenanceComponent } from './clientScope/clientscopemaintenance/clientscopemaintenance.component';
import { TemplatelistComponent } from './template/templatelist/templatelist.component';
import { TemplatemaintenanceComponent } from './template/templatemaintenance/templatemaintenance.component';
import { BusinessuserlistComponent } from './businessuser/businessuserlist/businessuserlist.component';
import { BusinessusermaintenanceComponent } from './businessuser/businessusermaintenance/businessusermaintenance.component';
import { TemplatemassiveComponent } from './template/templatemassive/templatemassive.component';
import { RealmrolelistComponent } from './realmrole/realmrolelist/realmrolelist.component';
import { RealmrolmaintenanceComponent } from './realmrole/realmrolmaintenance/realmrolmaintenance.component';
import { RealmgrouplistComponent } from './realmgroup/realmgrouplist/realmgrouplist.component';
import { RealmgroupmaintenanceComponent } from './realmgroup/realmgroupmaintenance/realmgroupmaintenance.component';
import { RealmsessionlistComponent } from './realmsession/realmsessionlist/realmsessionlist.component';
import { ChatComponent } from './chat/chat.component';
import { TemplatemassivelistComponent } from './template/templatemassivelist/templatemassivelist.component';
import { MenuoptionlistComponent } from './menuoption/menuoptionlist/menuoptionlist.component';
import { MenuoptionmaintenanceComponent } from './menuoption/menuoptionmaintenance/menuoptionmaintenance.component';

export const routes: Routes = [
	{
		path: 'security',
		children: [
			{ path: 'main', component: MainComponent },
			{ path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
			{
				path: 'realm',
				children: [
					{ path: 'list', component: RealmlistComponent, data: { title: 'Realm list' } },
					{ path: 'maintenance', component: RealmmaintenanceComponent, data: { title: 'Realm list - New' } },
					{ path: 'maintenance/:id', component: RealmmaintenanceComponent, data: { title: 'Realm list - Edit' } }
				]
			},
			{
				path: 'client',
				children: [
					{ path: 'list', component: ClientlistComponent, data: { title: 'Client list' } },
					{ path: 'maintenance', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - New' } },
					{ path: 'maintenance/:id', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - Edit' } }
				]
			},
			{
				path: 'bank',
				children: [
					{ path: 'list', component: BanklistComponent, data: { title: 'Bank list' } },
					{ path: 'maintenance', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - New' } },
					{ path: 'maintenance/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - Edit' } },
					{ path: 'maintenance/:edit/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - View' } }
				]
			},
			{
				path: 'country',
				children: [
					{ path: 'list', component: CountrylistComponent, data: { title: 'Country list' } },
					{ path: 'maintenance', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - New' } },
					{ path: 'maintenance/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - Edit' } },
					{ path: 'maintenance/:edit/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - View' } }
				]
			},
			{
				path: 'page',
				children: [
					{ path: 'list', component: PagelistComponent, data: { title: 'Page list' } },
					{ path: 'maintenance', component: PagemaintenanceComponent, data: { title: 'Page maintenance - New' } }
				]
			},
			{
				path: 'profile',
				children: [
					{ path: 'list', component: ProfilelistComponent, data: { title: 'Profile list' } },
					{ path: 'maintenance', component: ProfilemaintenanceComponent, data: { title: 'Profile maintenance - New' } }
				]
			},
			{
				path: 'clientscope',
				children: [
					{ path: 'list', component: ClientscopelistComponent, data: { title: 'Client Scope list' } },
					{ path: 'maintenance', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New' } },
					{ path: 'maintenance/:id', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New' } }
				]
			},
			{
				path: 'businessuser',
				children: [
					{ path: 'list', component: BusinessuserlistComponent, data: { title: 'Business User list' } },
					{ path: 'maintenance', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - New' } },
					{ path: 'maintenance/:id', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - Edit' } }
				]
			},
			{
				path: 'realmgroup',
				children: [
					{ path: 'list', component: RealmgrouplistComponent },
					{ path: 'maintenance', component: RealmgroupmaintenanceComponent },
					{ path: 'maintenance/:id', component: RealmgroupmaintenanceComponent }
				]
			},
			{
				path: 'template',
				children: [
					{ path: 'list', component: TemplatelistComponent, data: { title: 'Template list' } },
					{ path: 'maintenance', component: TemplatemaintenanceComponent, data: { title: 'Template maintenance - New' } },
					{ path: 'massive', component: TemplatemassiveComponent, data: { title: 'Template massive - Edit' } },
					{ path: 'massivelist', component: TemplatemassivelistComponent, data: { title: 'Template massive list - View' } }
				]
			},
			{
				path: 'realmrole',
				children: [
					{ path: 'list', component: RealmrolelistComponent },
					{ path: 'maintenance', component: RealmrolmaintenanceComponent },
					{ path: 'maintenance/:id', component: RealmrolmaintenanceComponent }
				]
			},
			{
				path: 'realmsession',
				children: [{ path: 'list', component: RealmsessionlistComponent }]
			},
			{
				path: 'menuoption',
				children: [
					{ path: 'list', component: MenuoptionlistComponent, data: { title: 'Menu Option list' } },
					{ path: 'maintenance', component: MenuoptionmaintenanceComponent, data: { title: 'Menu Option maintenance - New' } }
				]
			}
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
