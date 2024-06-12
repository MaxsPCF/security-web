import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { RealmlistComponent } from './realm/realmlist/realmlist.component';
import { RealmmaintenanceComponent } from './realm/realmmaintenance/realmmaintenance.component';
import { BanklistComponent } from './bank/banklist/banklist.component';
import { BankmaintenanceComponent } from './bank/bankmaintenance/bankmaintenance.component';
import { PagelistComponent } from './page/pagelist/pagelist.component';
import { PagemaintenanceComponent } from './page/pagemaintenance/pagemaintenance.component';

export const routes: Routes = [
	{
		path: 'security',
		children: [
			{ path: 'main', component: MainComponent },
			{
				path: 'realm',
				children: [
					{ path: 'list', component: RealmlistComponent },
					{ path: 'maintenance', component: RealmmaintenanceComponent }
				]
			},
			{ path: 'client', component: ClientComponent },
			{
				path: 'bank',
				children: [
					{ path: 'list', component: BanklistComponent },
					{ path: 'maintenance', component: BankmaintenanceComponent },
					{ path: 'maintenance/:id', component: BankmaintenanceComponent }
				]
			},
			{
				path: 'page',
				children: [
					{ path: 'list', component: PagelistComponent },
					{ path: 'maintenance', component: PagemaintenanceComponent }
				]
			}
		]
	},
	{ path: '**', component: EmptyRouteComponent }
];
