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

	private parseToken(token) {
		let payload;
		payload = token.split('.')[1];
		payload = window.atob(payload);
		payload = JSON.parse(payload);
		this.user = <IUser>payload;
		this.sessionToken = token;
		this.ls.save("token", token);
		this.backend.setAuthToken(token);
		return payload;
	}

	public logout() {
		if(this.sessionToken) {
			return this.backend.post(apiUrls.auth.logout)
				.do(res => {
					console.log("auth service logout:", res);
					if(res.OK) {
						this.ls.remove("token");
						this.sessionToken = "";
						this.backend.setAuthToken("");
						this.user = undefined;
						this.fireEvent();
					}
					return res;
			});
		}
	}

	public login(user) {
		return this.backend.post(apiUrls.auth.login, user)
			.do(res => {
				console.log("auth service login:", res);
				if (res && res.token) {
					this.parseToken(res.token);
					this.fireEvent();
				}
				return res;
			});
	}

	public register(user) {
		return this.backend.post(apiUrls.auth.register, user)
			.do(res => {
				console.log("auth service:", res);
				this.parseToken(res.token);
				this.fireEvent();
				return res;
			});
	}

	public restoreToken() {
		let token = this.ls.load("token");
		if (token) {
			this.parseToken(token);
		}
	}

	public getSessionToken() {
		if (!this.sessionToken) {
			this.restoreToken();
		}
		return this.sessionToken;
	}

	private appSubscriber;
	public subscribe(cb) {
		this.appSubscriber = cb;
	}
	private fireEvent() {
		if (this.appSubscriber) {
			let state = this.isAuthorized();
			this.appSubscriber(state);
		}
	}

	public isAuthorized() : boolean {
		var token = this.getSessionToken();
	  if (token) {
			var payload = this.parseToken(token);
			let isAuth = payload.exp > Date.now() / 1000;
			console.log("isAuthorized", isAuth);
	    return isAuth;
	  } else {
	    return false;
	  }
	}
}
