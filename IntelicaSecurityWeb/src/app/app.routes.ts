import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { RealmComponent } from "./realm/realm.component";
import { ClientComponent } from "./client/client.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
export const routes: Routes = [
	{
		path: "security",
		children: [
			{ path: "main", component: MainComponent },
			{ path: "realm", component: RealmComponent },
			{ path: "client", component: ClientComponent },
		],
	},
	{ path: "**", component: EmptyRouteComponent },
];