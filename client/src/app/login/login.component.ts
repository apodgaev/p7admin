import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RegisterComponent } from './register/register.component';

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
		public dialog: MdDialog,
		private auth : AuthService
	) { }

  ngOnInit() {
		if (this.auth.isAuthorized()) {
			// redirect to dashboard
		}
  }

	doLogin() {
		if (this.cred.email && this.cred.password) {
			console.log(this.cred);
			this.auth.login(this.cred)
				.subscribe(res  => {
						console.log("success", res);
						this.router.navigate(['/dashboard']);
					}, err => {
						console.log("error", err);
						//TODO: set validation state to controls
					});
		}
	}

	register() {
		let dialogRef = this.dialog.open(RegisterComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
			if (result) {
				this.auth.register(result)
					.subscribe(res => {
						console.log("success", res);
						this.router.navigate(['/dashboard']);
					}, err => {
						console.log("error", err);
						this.register();
					});
			}
    });
	}
}
