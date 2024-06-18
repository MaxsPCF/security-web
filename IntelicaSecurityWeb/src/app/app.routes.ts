<<<<<<< HEAD
import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { RealmlistComponent } from "./realm/realmlist/realmlist.component";
import { RealmmaintenanceComponent } from "./realm/realmmaintenance/realmmaintenance.component";
import { BanklistComponent } from "./bank/banklist/banklist.component";
import { BankmaintenanceComponent } from "./bank/bankmaintenance/bankmaintenance.component";
import { CountrylistComponent } from "./country/countrylist/countrylist.component";
import { CountrymaintenanceComponent } from "./country/countrymaintenance/countrymaintenance.component";
import { PagelistComponent } from "./page/pagelist/pagelist.component";
import { PagemaintenanceComponent } from "./page/pagemaintenance/pagemaintenance.component";
import { ClientlistComponent } from "./client/clientlist/clientlist.component";
import { ClientmaintenanceComponent } from "./client/clientmaintenance/clientmaintenance.component";
import { ProfilelistComponent } from "./profile/profilelist/profilelist.component";
import { ProfilemaintenanceComponent } from "./profile/profilemaintenance/profilemaintenance.component";
import { TemplatelistComponent } from "./template/templatelist/templatelist.component";
import { TemplatemaintenanceComponent } from "./template/templatemaintenance/templatemaintenance.component";
=======
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
import { GouplistComponent } from './group/gouplist/gouplist.component';
import { GoupmaintenanceComponent } from './group/goupmaintenance/goupmaintenance.component';
import { TemplatelistComponent } from './template/templatelist/templatelist.component';
import { TemplatemaintenanceComponent } from './template/templatemaintenance/templatemaintenance.component';
import { RollistComponent } from './rol/rollist/rollist.component';
import { RolmaintenanceComponent } from './rol/rolmaintenance/rolmaintenance.component';

>>>>>>> 48f98966babd1f4792642e9a89798690e7d86960
export const routes: Routes = [
	{
		path: "security",
		children: [
			{ path: "main", component: MainComponent },
			{
				path: "realm",
				children: [
					{ path: "list", component: RealmlistComponent, data: { title: "Realm list" } },
					{ path: "maintenance", component: RealmmaintenanceComponent, data: { title: "Realm list - New" } },
					{ path: "maintenance/:id", component: RealmmaintenanceComponent, data: { title: "Realm list - Edit" } },
				],
			},
			{
				path: "client",
				children: [
					{ path: "list", component: ClientlistComponent, data: { title: "Client list" } },
					{ path: "maintenance", component: ClientmaintenanceComponent, data: { title: "Client maintenance - New" } },
					{ path: "maintenance/:id", component: ClientmaintenanceComponent, data: { title: "Client maintenance - Edit" } },
				],
			},
			{
				path: "bank",
				children: [
					{ path: "list", component: BanklistComponent, data: { title: "Bank list" } },
					{ path: "maintenance", component: BankmaintenanceComponent, data: { title: "Bank maintenance - New" } },
					{ path: "maintenance/:id", component: BankmaintenanceComponent, data: { title: "Bank maintenance - Edit" } },
				],
			},
			{
				path: "country",
				children: [
					{ path: "list", component: CountrylistComponent, data: { title: "Country list" } },
					{ path: "maintenance", component: CountrymaintenanceComponent, data: { title: "Country maintenance - New" } },
					{ path: "maintenance/:id", component: CountrymaintenanceComponent, data: { title: "Country maintenance - Edit" } },
				],
			},
			{
				path: "page",
				children: [
					{ path: "list", component: PagelistComponent, data: { title: "Page list" } },
					{ path: "maintenance", component: PagemaintenanceComponent, data: { title: "Page maintenance - New" } },
				],
			},
			{
				path: "profile",
				children: [
<<<<<<< HEAD
					{ path: "list", component: ProfilelistComponent, data: { title: "Profile list" } },
					{ path: "maintenance", component: ProfilemaintenanceComponent, data: { title: "Profile maintenance - New" } },
				],
			},
			{
				path: "template",
				children: [
					{ path: "list", component: TemplatelistComponent, data: { title: "Template list" } },
					{ path: "maintenance", component: TemplatemaintenanceComponent, data: { title: "Template maintenance - New" } },
					{ path: "maintenance/:id", component: TemplatemaintenanceComponent, data: { title: "Template maintenance - Edit" } },
					{ path: "maintenance/:read/:id", component: TemplatemaintenanceComponent, data: { title: "Template maintenance - Read" } },
				],
			},
		],
=======
					{ path: 'list', component: ProfilelistComponent },
					{ path: 'maintenance', component: ProfilemaintenanceComponent }
				]
			},
			{
				path: 'group',
				children: [
					{ path: 'list', component: GouplistComponent },
					{ path: 'maintenance', component: GoupmaintenanceComponent },
					{ path: 'maintenance/:id', component: GoupmaintenanceComponent }
				]
			},
			{
				path: 'template',
				children: [
					{ path: 'list', component: TemplatelistComponent },
					{ path: 'maintenance', component: TemplatemaintenanceComponent }
				]
			},
			{
				path: 'rol',
				children: [
					{ path: 'list', component: RollistComponent },
					{ path: 'maintenance', component: RolmaintenanceComponent },
					{ path: 'maintenance/:id', component: RolmaintenanceComponent }
				]
			}
		]
>>>>>>> 48f98966babd1f4792642e9a89798690e7d86960
	},
	{ path: "**", component: EmptyRouteComponent },
];
