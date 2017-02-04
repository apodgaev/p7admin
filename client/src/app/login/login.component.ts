import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private cred = {
		email : "",
		password : ""
	};

  constructor(
		private router : Router,
		private auth : AuthService
	) { }

  ngOnInit() {
		if(this.auth.isAuthorized()) {
			// redirect to dashboard
		}
  }

	doLogin() {
		if(this.cred.email && this.cred.password) {
			console.log(this.cred);
			this.auth.login(this.cred)
				.subscribe(res  => {
						console.log(res);
						/*
						if(res == "OK") {
							this.storage.save("config", this.config);
							this.router.navigate(['/dashboard']);
						}
						*/
					});
		}
	}
}
