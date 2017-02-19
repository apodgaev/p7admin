import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import './rxjs-operators';

import { AppComponent } from './app.component';
import { AppRoutes } from './routes/routes';
import { AuthGuard } from './routes/auth.guard';

import { AuthService } from './login/auth.service';
import { ApiDictionaryService } from './services/api-dictionary.service';
import { ConfigService } from './config/config.service';
import { BackendService } from './services/backend.service';
import { StorageService } from './services/storage.service';
import { EntitiesService } from './services/entities.service';
import { ListsService } from './services/lists.service';

import { ConfigComponent } from './config/config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StarsComponent } from './entities/stars/stars.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { StarInfoComponent } from './entities/stars/star-info/star-info.component';
import { PlanetTypeComponent } from './lists/planet-type/planet-type.component';
import { SelectListComponent } from './select-list/select-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DashboardComponent,
    PageNotFoundComponent,
    StarsComponent,
    LoginComponent,
		RegisterComponent,
		StarInfoComponent,
		PlanetTypeComponent,
		SelectListComponent
  ],
	entryComponents: [
		RegisterComponent
	],
  imports: [
		RouterModule.forRoot(AppRoutes),
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
		EntitiesService,
		AuthService,
		AuthGuard,
		ListsService
	],
  bootstrap: [AppComponent]
})
export class AppModule {
	// Diagnostic only: inspect router configuration
  constructor(router: Router) {
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
