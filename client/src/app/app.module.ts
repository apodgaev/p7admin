import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StarsComponent } from './entities/stars/stars.component';

import { ApiDictionaryService } from './services/api-dictionary.service';
import { ConfigService } from './config/config.service';
import { BackendService } from './services/backend.service';
import { StorageService } from './services/storage.service';
import { EntitiesService } from './services/entities.service';

const appRoutes: Routes = [
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
    redirectTo: '/config',
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
    StarsComponent
  ],
  imports: [
		RouterModule.forRoot(appRoutes),
		MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
		StorageService,
		ApiDictionaryService,
		BackendService,
		ConfigService,
		EntitiesService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
