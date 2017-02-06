import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
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
		private auth : AuthService
	)	{
		this.isAuth = false;
	}

	refreshState(state) {
		this.isAuth = state;
	}

	ngOnInit() {
		if (this.auth.isAuthorized()) {
			// initialize
			this.refreshState(true);
		}
		this.auth.subscribe(state => {
			this.refreshState(state);
		});
  }

	logout(event) {
		event.preventDefault();
		this.auth.logout()
			.subscribe(res => {
				console.log("logout success", res);
				this.refreshState(false);
				this.router.navigate(['/']);
			});
	}
}
