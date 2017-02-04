import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import './rxjs-operators';

import {BrowserXhr} from "@angular/http";
import { CORSBrowserXHR } from './http.hack';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StarsComponent } from './entities/stars/stars.component';
import { LoginComponent } from './login/login.component';

import { ApiDictionaryService } from './services/api-dictionary.service';
import { ConfigService } from './config/config.service';
import { BackendService } from './services/backend.service';
import { StorageService } from './services/storage.service';
import { EntitiesService } from './services/entities.service';
import { AuthService } from './login/auth.service';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
  { path: 'config', component: ConfigComponent },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
	{
    path: 'stars',
    component: StarsComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DashboardComponent,
    PageNotFoundComponent,
    StarsComponent,
    LoginComponent
  ],
  imports: [
		RouterModule.forRoot(appRoutes),
		MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
		//{ provide: BrowserXhr, useClass: CORSBrowserXHR },
		StorageService,
		ApiDictionaryService,
		BackendService,
		ConfigService,
		EntitiesService,
		AuthService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
