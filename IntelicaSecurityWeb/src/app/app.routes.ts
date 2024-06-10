import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { ClientComponent } from "./client/client.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { RealmlistComponent } from "./realm/realmlist/realmlist.component";
import { RealmmaintenanceComponent } from "./realm/realmmaintenance/realmmaintenance.component";
export const routes: Routes = [
	{
		path: "security",
		children: [
			{ path: "main", component: MainComponent },
			{
				path: "realm",
				children: [
					{ path: "list", component: RealmlistComponent },
					{ path: "maintenance", component: RealmmaintenanceComponent },
				],
			},
			{ path: "client", component: ClientComponent },
		],
	},
	{ path: "**", component: EmptyRouteComponent },
];