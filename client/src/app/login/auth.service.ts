import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { BackendService } from '../services/backend.service';
import { StorageService } from '../services/storage.service';

export interface IUser {
	email : string;
	name : string;
}

@Injectable()
export class AuthService {

	private user : IUser;
	private sessionToken: string;

  constructor(
		private backend: BackendService,
		private ls: StorageService
	) { }

	public login(user) {
		return this.backend.post(apiUrls.auth.login, user)
			.do(res => {
				console.log("auth service:", res);
			});
	}

	public register(user) {
		return this.backend.post(apiUrls.auth.register, user)
			.do(res => {
				console.log("auth service:", res);
				this.ls.save("token", res.token);
				this.sessionToken = res.token;
				this.backend.setAuthToken(res.token);
				this.user = res.user;
				return res;
			});
	}

	public logout() {
		this.ls.remove("token");
		this.sessionToken = "";
		this.backend.setAuthToken("");
		this.user = undefined;
	}

	public refresh() {
		if (!this.sessionToken) {
			let token = this.ls.load("token");
			this.sessionToken = token;
			this.backend.setAuthToken(token);
		}
	}

	public getSessionToken() {
		if (!this.sessionToken) {
			let token = this.ls.load("token");
			this.sessionToken = token;
		}
		return this.sessionToken;
	}

	public isAuthorized() : boolean {
		var token = this.getSessionToken();
	  var payload;
	  if (token) {
	    payload = token.split('.')[1];
	    payload = window.atob(payload);
	    payload = JSON.parse(payload);
			this.user = <IUser>payload;
			console.log("isAuthorized", this.user);
	    return payload.exp > Date.now() / 1000;
	  } else {
	    return false;
	  }
	}
}
