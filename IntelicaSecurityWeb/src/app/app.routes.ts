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
import { FeatureflaglistComponent } from './featureflag/featureflaglist/featureflaglist.component';
import { FeatureflagmaintenanceComponent } from './featureflag/featureflagmaintenance/featureflagmaintenance.component';
import { ComponentComponent } from './template/component/component.component';

export const routes: Routes = [
	{
		path: 'security',
		children: [
			{ path: 'main', component: MainComponent },
			{ path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
			{
				path: 'realm',
				children: [
					{ path: 'list', component: RealmlistComponent, data: { title: 'Realm list', pageRoot: 'realm' } },
					{ path: 'maintenance', component: RealmmaintenanceComponent, data: { title: 'Realm list - New', pageRoot: 'realm' } },
					{ path: 'maintenance/:id', component: RealmmaintenanceComponent, data: { title: 'Realm list - Edit', pageRoot: 'realm' } }
				]
			},
			{
				path: 'client',
				children: [
					{ path: 'list', component: ClientlistComponent, data: { title: 'Client list', pageRoot: 'client' } },
					{ path: 'maintenance', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - New', pageRoot: 'client' } },
					{ path: 'maintenance/:id', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - Edit', pageRoot: 'client' } }
				]
			},
			{
				path: 'bank',
				children: [
					{ path: 'list', component: BanklistComponent, data: { title: 'Bank list', pageRoot: 'bank' } },
					{ path: 'maintenance', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - New', pageRoot: 'bank' } },
					{ path: 'maintenance/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - Edit', pageRoot: 'bank' } },
					{ path: 'maintenance/:edit/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - View', pageRoot: 'bank' } }
				]
			},
			{
				path: 'country',
				children: [
					{ path: 'list', component: CountrylistComponent, data: { title: 'Countries', pageRoot: 'country' } },
					{ path: 'maintenance', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - New', pageRoot: 'country' } },
					{ path: 'maintenance/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - Edit', pageRoot: 'country' } },
					{ path: 'maintenance/:edit/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - View', pageRoot: 'country' } }
				]
			},
			{
				path: 'page',
				children: [
					{ path: 'list', component: PagelistComponent, data: { title: 'Page list', pageRoot: 'page' } },
					{ path: 'maintenance', component: PagemaintenanceComponent, data: { title: 'Page maintenance - New', pageRoot: 'page' } }
				]
			},
			{
				path: 'profile',
				children: [
					{ path: 'list', component: ProfilelistComponent, data: { title: 'Profile list', pageRoot: 'profile'  } },
					{ path: 'maintenance', component: ProfilemaintenanceComponent, data: { title: 'Profile maintenance - New', pageRoot: 'profile' } }
				]
			},
			{
				path: 'clientscope',
				children: [
					{ path: 'list', component: ClientscopelistComponent, data: { title: 'Client Scope list', pageRoot: 'clientscope' } },
					{ path: 'maintenance', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New', pageRoot: 'clientscope' } },
					{ path: 'maintenance/:id', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New', pageRoot: 'clientscope' } }
				]
			},
			{
				path: 'businessuser',
				children: [
					{ path: 'list', component: BusinessuserlistComponent, data: { title: 'Business User list', pageRoot: 'businessuser' } },
					{ path: 'maintenance', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - New', pageRoot: 'businessuser' } },
					{ path: 'maintenance/:id', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - Edit', pageRoot: 'businessuser' } }
				]
			},
			{
				path: 'realmgroup',
				children: [
					{ path: 'list', component: RealmgrouplistComponent, data: { pageRoot: 'realmgroup' } },
					{ path: 'maintenance', component: RealmgroupmaintenanceComponent, data: { pageRoot: 'realmgroup' } },
					{ path: 'maintenance/:id', component: RealmgroupmaintenanceComponent, data: { pageRoot: 'realmgroup' } }
				]
			},
			{
				path: 'template',
				children: [
					{ path: 'list', component: TemplatelistComponent, data: { title: 'Template list' } },
					{ path: 'maintenance', component: TemplatemaintenanceComponent, data: { title: 'Template maintenance - New' } },
					{ path: 'massive', component: TemplatemassiveComponent, data: { title: 'Template massive - Edit' } },
					{ path: 'massivelist', component: TemplatemassivelistComponent, data: { title: 'Template massive list - View' } },
					{ path: 'component', component: ComponentComponent, data: { title: 'Component list - View' } }
				]
			},
			{
				path: 'realmrole',
				children: [
					{ path: 'list', component: RealmrolelistComponent, data: { pageRoot: 'realmrole' } },
					{ path: 'maintenance', component: RealmrolmaintenanceComponent, data: { pageRoot: 'realmrole' } },
					{ path: 'maintenance/:id', component: RealmrolmaintenanceComponent, data: { pageRoot: 'realmrole' } }
				]
			},
			{
				path: 'realmsession',
				children: [{ path: 'list', component: RealmsessionlistComponent }]
			},
			{
				path: 'menuoption',
				children: [
					{ path: 'list', component: MenuoptionlistComponent, data: { title: 'Menu Option list', pageRoot: 'menuoption' } },
					{ path: 'maintenance', component: MenuoptionmaintenanceComponent, data: { title: 'Menu Option maintenance - New', pageRoot: 'menuoption' } }
				]
			},
			{
				path: 'featureflag',
				children: [
					{ path: 'list', component: FeatureflaglistComponent, data: { title: 'Feature Flag list' } },
					{ path: 'maintenance', component: FeatureflagmaintenanceComponent, data: { title: 'Feature Flag maintenance - New' } },
					{ path: 'maintenance/:id', component: FeatureflagmaintenanceComponent, data: { title: 'Feature Flag maintenance - Edit' } }
				]
			}
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
