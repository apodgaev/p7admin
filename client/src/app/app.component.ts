import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import { BackendService } from './services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project 7';

	isAuth : boolean;

	constructor (
		private router : Router,
		private auth : AuthService,
		private backend: BackendService
	)	{
		this.isAuth = false;
	}

	ngOnInit() {
		this.auth.init();
		this.backend.init();
		this.isAuth = !!this.auth.isAuthorized();
		if(this.isAuth) {
			this.router.navigateByUrl('dashboard');
		}
		console.log("isAuth", this.isAuth);
		this.auth.subscribe(() => {
			let token = this.auth.isAuthorized();
			console.log("core app state change", token);
			this.isAuth = !!token;
			if(!token && !this.router.isActive('/', true)) {
				this.router.navigateByUrl('/');
			}
		});
  }

	logout(event) {
		event.preventDefault();
		this.auth.logout();
	}
}
