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
import { BusinessuserlistComponent } from './businessuser/businessuserlist/businessuserlist.component';
import { BusinessusermaintenanceComponent } from './businessuser/businessusermaintenance/businessusermaintenance.component';
import { RealmsessionlistComponent } from './realmsession/realmsessionlist/realmsessionlist.component';
import { MenuoptionlistComponent } from './menuoption/menuoptionlist/menuoptionlist.component';
import { MenuoptionmaintenanceComponent } from './menuoption/menuoptionmaintenance/menuoptionmaintenance.component';
import { BankgrouplistComponent } from './bankgroup/bankgrouplist/bankgrouplist.component';
import { BankgroupmaintenanceComponent } from './bankgroup/bankgroupmaintenance/bankgroupmaintenance.component';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
	{
		path: 'security',
		children: [
			{ path: 'main', component: MainComponent },
			{
				path: 'realm',
				children: [
					{ path: 'list', component: RealmlistComponent, data: { title: 'Realm list' , pageRoot: 'Realm'} },
					{ path: 'maintenance', component: RealmmaintenanceComponent, data: { title: 'Realm list - New', pageRoot: 'Realm' } },
					{ path: 'maintenance/:id', component: RealmmaintenanceComponent, data: { title: 'Realm list - Edit', pageRoot: 'Realm' } }
				]
			},
			{
				path: 'client',
				children: [
					{ path: 'list', component: ClientlistComponent, data: { title: 'Client list', pageRoot: 'Client' } },
					{ path: 'maintenance', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - New' , pageRoot: 'Client'} },
					{ path: 'maintenance/:id', component: ClientmaintenanceComponent, data: { title: 'Client maintenance - Edit' , pageRoot: 'Client'} }
				]
			},
			{
				path: 'bank',
				children: [
					{ path: 'list', component: BanklistComponent, data: { title: 'Bank list', pageRoot: 'Bank' } },
					{ path: 'maintenance', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - New', pageRoot: 'Bank' } },
					{ path: 'maintenance/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - Edit', pageRoot: 'Bank' } },
					{ path: 'maintenance/:read/:id', component: BankmaintenanceComponent, data: { title: 'Bank maintenance - View', pageRoot: 'Bank' } }
				]
			},
			{
				path: 'bankgroup',
				children: [
					{ path: 'list', component: BankgrouplistComponent, data: { title: 'Bank Group list', pageRoot: 'bankgroup' } },
					{ path: 'maintenance', component: BankgroupmaintenanceComponent, data: { title: 'Bank Group maintenance - New', pageRoot: 'bankgroup' } },
					{ path: 'maintenance/:id', component: BankgroupmaintenanceComponent, data: { title: 'Bank Group maintenance - Edit', pageRoot: 'bankgroup' } },
					{ path: 'maintenance/:edit/:id', component: BankgroupmaintenanceComponent, data: { title: 'Bank Group maintenance - View', pageRoot: 'bankgroup' } }
				]
			},
			{
				path: 'country',
				children: [
					{ path: 'list', component: CountrylistComponent, data: { title: 'Countries', pageRoot: 'Country' } },
					{ path: 'maintenance', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - New' , pageRoot: 'Country'} },
					{ path: 'maintenance/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - Edit', pageRoot: 'Country' } },
					{ path: 'maintenance/:read/:id', component: CountrymaintenanceComponent, data: { title: 'Country maintenance - View' , pageRoot: 'Country'} }
				]
			},
			{
				path: 'page',
				children: [
					{ path: 'list', component: PagelistComponent, data: { title: 'Page list',pageRoot: 'Page'  } },
					{ path: 'maintenance', component: PagemaintenanceComponent, data: { title: 'Page maintenance - New' ,pageRoot: 'Page'   } }
				]
			},
			{
				path: 'profile',
				children: [
					{ path: 'list', component: ProfilelistComponent, data: { title: 'Profile list', pageRoot: 'Profile' } },
					{ path: 'maintenance', component: ProfilemaintenanceComponent, data: { title: 'Profile maintenance - New' , pageRoot: 'Profile'} }
				]
			},
			{
				path: 'clientscope',
				children: [
					{ path: 'list', component: ClientscopelistComponent, data: { title: 'Client Scope list' , pageRoot: 'Clientscope' } },
					{ path: 'maintenance', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New', pageRoot: 'Clientscope' } },
					{ path: 'maintenance/:id', component: ClientscopemaintenanceComponent, data: { title: 'Client Scope maintenance - New', pageRoot: 'Clientscope' } }
				]
			},
			{
				path: 'businessuser',
				children: [
					{ path: 'list', component: BusinessuserlistComponent, data: { title: 'Business User list', pageRoot: 'Businessuser' } },
					{ path: 'maintenance', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - New', pageRoot: 'Businessuser'} },
					{ path: 'maintenance/:id', component: BusinessusermaintenanceComponent, data: { title: 'Business User maintenance - Edit', pageRoot: 'Businessuser' } }
				]
			},
			{
				path: 'realmsession',
				children: [{ path: 'list', component: RealmsessionlistComponent, data: { title: 'Realm Session list', pageRoot: 'RealmSession' } }]
			},
			{
				path: 'menuoption',
				children: [
					{ path: 'list', component: MenuoptionlistComponent, data: { title: 'Menu Option list', pageRoot: 'menuoption' } },
					{ path: 'maintenance', component: MenuoptionmaintenanceComponent, data: { title: 'Menu Option maintenance - New', pageRoot: 'menuoption' } }
				]
			},
			{ path: 'demo', component: DemoComponent, data: { title: 'Demo', pageRoot: 'term' } }

			
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
