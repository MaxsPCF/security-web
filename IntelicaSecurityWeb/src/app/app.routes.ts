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

export const routes: Routes = [
	{
		path: 'security',
		children: [
			{ path: 'main', component: MainComponent },
			{
				path: 'realm',
				children: [
					{ path: 'list', component: RealmlistComponent },
					{ path: 'maintenance', component: RealmmaintenanceComponent },
					{ path: 'maintenance/:id', component: RealmmaintenanceComponent }
				]
			},
			{
				path: 'client',
				children: [
					{ path: 'list', component: ClientlistComponent },
					{ path: 'maintenance', component: ClientmaintenanceComponent },
					{ path: 'maintenance/:id', component: ClientmaintenanceComponent }
				]
			},
			{
				path: 'bank',
				children: [
					{ path: 'list', component: BanklistComponent },
					{ path: 'maintenance', component: BankmaintenanceComponent },
					{ path: 'maintenance/:id', component: BankmaintenanceComponent }
				]
			},
			{
				path: 'country',
				children: [
					{ path: 'list', component: CountrylistComponent },
					{ path: 'maintenance', component: CountrymaintenanceComponent },
					{ path: 'maintenance/:id', component: CountrymaintenanceComponent }
				]
			},
			{
				path: 'page',
				children: [
					{ path: 'list', component: PagelistComponent },
					{ path: 'maintenance', component: PagemaintenanceComponent }
				]
			},
			{
				path: 'profile',
				children: [
					{ path: 'list', component: ProfilelistComponent },
					{ path: 'maintenance', component: ProfilemaintenanceComponent }
				]
			}
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
