import { Routes } from '@angular/router'

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
			},
		],
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [],
	},
	{
		path: '**',
		redirectTo: '',
	},
]
