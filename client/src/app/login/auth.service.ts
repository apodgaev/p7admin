import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { StorageService } from '../services/storage.service';
import { createStore } from 'redux';

export interface IUser {
	email : string;
	name : string;
	exp : number;
}

// action types
const LOGIN_ACTION = "LOGIN";
const LOGOUT_ACTION = "LOGOUT";
const AUTH_ACTION = "AUTH";

// action builders
const loginAction = (token) => {
	return {
		type: LOGIN_ACTION,
		token: token
	}
}

const logoutAction = () => {
	return {
		type: LOGOUT_ACTION
	}
}

const authAction = () => {
	return {
		type: AUTH_ACTION
	}
}

const logoutState = {loading: false, user: null, token: ""};

@Injectable()
export class AuthService {
	private _store;

	constructor(
		private http: Http,
		private ls: StorageService
	) {}

	init() {
		console.log("init");
		let initState = {
			loading: false
		};
		let token = this.ls.load("token");
		if (token) {
			let state = {
				user : this.parseToken(token),
				token : token
			};
			initState = Object.assign(initState, state);
		}
		this._store = createStore(
			this.authHandler,
			initState);
		console.log("initial auth state:", this._store.getState());
		let unsubscribe = this._store.subscribe(() =>
  		console.log("auth state change:", this._store.getState())
		);
  }

	private authHandler(state = logoutState, action) : any {
		switch(action.type) {
			case LOGIN_ACTION:
				let user = this.parseToken(action.token);
				return Object.assign({}, {
					loading: false,
					user: user,
					token: action.token
				});
			case LOGOUT_ACTION:
				return Object.assign({}, {
					loading: false,
					user: null,
					token: ""
				});
			case AUTH_ACTION:
				return Object.assign({}, state, {
					loading: true
				});
			default:
				return state;
		}
	}

	private parseToken(token) : IUser {
		let payload;
		payload = token.split('.')[1];
		payload = window.atob(payload);
		payload = JSON.parse(payload);
		return <IUser>payload;
	}

	public isAuthorized() : String {
		let state = this._store.getState();
		if(state && state.token) {
			let auth = state.user.exp > Date.now() / 1000;
			if(!auth) {
				this._store.dispatch(logoutAction());
			}
		}
		return state.token;
	}

	public subscribe(cb) {
		return this._store.subscribe(cb);
	}

	public login(user) {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.login, JSON.stringify(user))
			.map(res =>  res.json())
			.subscribe(res => {
				if (res && res.data && res.data.token) {
					this.ls.save("token", res.data.token);
					this._store.dispatch(loginAction(res.data.token));
				}
			},err => {
				this._store.dispatch(logoutAction());
			});
	}

	public logout() {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.logout, "")
			.map(res =>  res.json())
			.subscribe(res => {
				console.log("logout result", res);
				if(res.data.OK) {
					this.ls.remove("token");
					this._store.dispatch(logoutAction());
				}
			});
	}

	public register(user) {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.register, JSON.stringify(user))
			.map(res =>  res.json())
			.subscribe(res => {
				if (res && res.data && res.data.token) {
					this.ls.save("token", res.data.token);
					this._store.dispatch(loginAction(res.data.token));
				}
			});
	}
}
