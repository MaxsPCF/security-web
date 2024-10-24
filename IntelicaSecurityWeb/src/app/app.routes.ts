import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
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
import { BusinessuserlistComponent } from "./businessuser/businessuserlist/businessuserlist.component";
import { BusinessusermaintenanceComponent } from "./businessuser/businessusermaintenance/businessusermaintenance.component";
import { MenuoptionlistComponent } from "./menuoption/menuoptionlist/menuoptionlist.component";
import { MenuoptionmaintenanceComponent } from "./menuoption/menuoptionmaintenance/menuoptionmaintenance.component";
import { BankgrouplistComponent } from "./bankgroup/bankgrouplist/bankgrouplist.component";
import { BankgroupmaintenanceComponent } from "./bankgroup/bankgroupmaintenance/bankgroupmaintenance.component";
import { DemoComponent } from "./demo/demo.component";
import { TermGuard } from "./common/TernGuard";
export const routes: Routes = [
	{
		path: "security",
		children: [
			{ path: "main", component: MainComponent },
			{
				path: "client",
				children: [
					{ path: "list", canActivate: [TermGuard], component: ClientlistComponent, data: { title: "Client list", pageRoot: "Client" } },
					{ path: "maintenance", canActivate: [TermGuard],component: ClientmaintenanceComponent, data: { title: "Client maintenance - New", pageRoot: "Client" } },
					{ path: "maintenance/:id", canActivate: [TermGuard],component: ClientmaintenanceComponent, data: { title: "Client maintenance - Edit", pageRoot: "Client" } },
				],
			},
			{
				path: "bank",
				children: [
					{ path: "list", canActivate: [TermGuard],component: BanklistComponent, data: { title: "Bank list", pageRoot: "Bank" } },
					{ path: "maintenance",canActivate: [TermGuard], component: BankmaintenanceComponent, data: { title: "Bank maintenance - New", pageRoot: "Bank" } },
					{ path: "maintenance/:id",canActivate: [TermGuard], component: BankmaintenanceComponent, data: { title: "Bank maintenance - Edit", pageRoot: "Bank" } },
					{ path: "maintenance/:read/:id",canActivate: [TermGuard], component: BankmaintenanceComponent, data: { title: "Bank maintenance - View", pageRoot: "Bank" } },
				],
			},
			{
				path: "bankgroup",
				children: [
					{ path: "list",canActivate: [TermGuard], component: BankgrouplistComponent, data: { title: "Bank Group list", pageRoot: "bankgroup" } },
					{ path: "maintenance", canActivate: [TermGuard],component: BankgroupmaintenanceComponent, data: { title: "Bank Group maintenance - New", pageRoot: "bankgroup" } },
					{ path: "maintenance/:id",canActivate: [TermGuard], component: BankgroupmaintenanceComponent, data: { title: "Bank Group maintenance - Edit", pageRoot: "bankgroup" } },
					{ path: "maintenance/:edit/:id",canActivate: [TermGuard], component: BankgroupmaintenanceComponent, data: { title: "Bank Group maintenance - View", pageRoot: "bankgroup" } },
				],
			},
			{
				path: "country",
				children: [
					{ path: "list", canActivate: [TermGuard],component: CountrylistComponent, data: { title: "Countries", pageRoot: "Country" } },
					{ path: "maintenance",canActivate: [TermGuard], component: CountrymaintenanceComponent, data: { title: "Country maintenance - New", pageRoot: "Country" } },
					{ path: "maintenance/:id", canActivate: [TermGuard],component: CountrymaintenanceComponent, data: { title: "Country maintenance - Edit", pageRoot: "Country" } },
					{ path: "maintenance/:read/:id",canActivate: [TermGuard],component: CountrymaintenanceComponent, data: { title: "Country maintenance - View", pageRoot: "Country" } },
				],
			},
			{
				path: "page",
				children: [
					{ path: "list", canActivate: [TermGuard], component: PagelistComponent, data: { title: "Page list", pageRoot: "Page" } },
					{ path: "maintenance", canActivate: [TermGuard], component: PagemaintenanceComponent, data: { title: "Page maintenance - New", pageRoot: "Page" } },
				],
			},
			{
				path: "profile",
				children: [
					{ path: "list", canActivate: [TermGuard],component: ProfilelistComponent, data: { title: "Profile list", pageRoot: "Profile" } },
					{ path: "maintenance",canActivate: [TermGuard],component: ProfilemaintenanceComponent, data: { title: "Profile maintenance - New", pageRoot: "Profile" } },
				],
			},
			{
				path: "businessuser",
				children: [
					{ path: "list", canActivate: [TermGuard], component: BusinessuserlistComponent, data: { title: "Business User list", pageRoot: "Businessuser" } },
					{ path: "maintenance",canActivate: [TermGuard],  component: BusinessusermaintenanceComponent,  data: { title: "Business User maintenance - New", pageRoot: "Businessuser" } },
					{ path: "maintenance/:id",canActivate: [TermGuard],  component: BusinessusermaintenanceComponent, data: { title: "Business User maintenance - Edit", pageRoot: "Businessuser" } },
				],
			},
			{
				path: "menuoption",
				children: [
					{ path: "list", canActivate: [TermGuard],component: MenuoptionlistComponent, data: { title: "Menu Option list", pageRoot: "menuoption" } },
					{ path: "maintenance",canActivate: [TermGuard], component: MenuoptionmaintenanceComponent, data: { title: "Menu Option maintenance - New", pageRoot: "menuoption" } },
				],
			},
			{ path: "demo", component: DemoComponent, data: { title: "Demo", pageRoot: "term" } },
		],
	},
	{ path: "**", component: EmptyRouteComponent },
];