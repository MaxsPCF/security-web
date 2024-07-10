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
export const routes: Routes = [
	{
		path: 'security',
		//canActivate: [AuthGuard],
		children: [
			{ path: 'main', component: MainComponent },
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
					{ path: 'list', component: ProfilelistComponent },
					{ path: 'maintenance', component: ProfilemaintenanceComponent }
				]
			},
			{
				path: 'clientscope',
				children: [
					{ path: 'list', component: ClientscopelistComponent },
					{ path: 'maintenance', component: ClientscopemaintenanceComponent },
					{ path: 'maintenance/:id', component: ClientscopemaintenanceComponent }
				]
			},
			{
				path: 'businessuser',
				children: [
					{ path: 'list', component: BusinessuserlistComponent },
					{ path: 'maintenance', component: BusinessusermaintenanceComponent },
					{ path: 'maintenance/:id', component: BusinessusermaintenanceComponent }
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
					{ path: 'list', component: TemplatelistComponent },
					{ path: 'maintenance', component: TemplatemaintenanceComponent },
					{ path: 'massive', component: TemplatemassiveComponent }
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
			}
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
