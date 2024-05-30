import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
export const routes: Routes = [
	{
		path: "security",
		//canActivate: [AuthGuard],
		children: [
			{
				path: "",
				redirectTo: "/dashboard",
				pathMatch: "full",
			},
			{ path: "main", component: MainComponent }
		],
	},
    { path: "**", component: EmptyRouteComponent }
];