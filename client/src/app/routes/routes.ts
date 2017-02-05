import { Routes } from '@angular/router';

import { ConfigComponent } from '../config/config.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { StarsComponent } from '../entities/stars/stars.component';
import { LoginComponent } from '../login/login.component';

import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
  { path: 'config', component: ConfigComponent },
  {
    path: 'dashboard',
		canActivate: [AuthGuard],
    component: DashboardComponent
  },
	{
    path: 'stars',
		canActivate: [AuthGuard],
    component: StarsComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
