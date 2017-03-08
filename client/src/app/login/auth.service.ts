import { Injectable } from '@angular/core';
import { apiUrls } from '../services/api-urls';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { StorageService } from '../services/storage.service';
import { createStore } from 'redux';
import { LogoutReason, LOGIN_ACTION, LOGOUT_ACTION, AUTH_ACTION, loginAction, logoutAction, authAction } from './actions';

export interface IUser {
	email : string;
	name : string;
	admin: boolean;
	exp : number;
}

const logoutState = {loading: false, user: null, token: ""};

function parseToken(token) : IUser {
	let payload;
	payload = token.split('.')[1];
	payload = window.atob(payload);
	payload = JSON.parse(payload);
	return <IUser>payload;
}

@Injectable()
export class AuthService {
	private _store;
	private httpOptions;

	constructor(
		private http: Http,
		private ls: StorageService
	) {
		this.httpOptions = new RequestOptions({ headers: new Headers() });
		this.httpOptions.headers.append('Content-Type', 'application/json');
	}

	init() {
		console.log("init");
		// initial state = logged out
		let initState = logoutState;
		let token = this.ls.load("token");
		if (token) {
			// if token is saved - consider we are logged in
			let state = {
				user : parseToken(token),
				token : token
			};
			initState = Object.assign(initState, state);
		}
		/* eslint-disable no-underscore-dangle */
		let ext = typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']();
		this._store = createStore(
			this.authHandler,
			initState,
			ext);
		/* eslint-enable */
		console.log("initial auth state:", this._store.getState());
		let unsubscribe = this._store.subscribe(() =>
  		console.log("auth state change:", this._store.getState())
		);
  }

	private authHandler(state = logoutState, action) : any {
		switch(action.type) {
			case LOGIN_ACTION:
				let user = parseToken(action.token);
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

	public isAuthorized() : String {
		let state = this._store.getState();
		if(state && state.token) {
			let auth = state.user.exp > Date.now() / 1000;
			if(!auth) {
				this._store.dispatch(logoutAction(LogoutReason.SessionExpired));
			}
		}
		return state.token;
	}

	public subscribe(cb) {
		return this._store.subscribe(cb);
	}

	public login(user) {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.login, JSON.stringify(user), this.httpOptions)
			.map(res =>  res.json())
			.subscribe(res => {
				if (res && res.data && res.data.token) {
					this.ls.save("token", res.data.token);
					this._store.dispatch(loginAction(res.data.token));
				}
			},err => {
				this._store.dispatch(logoutAction(LogoutReason.WrongCredentials));
			});
	}

	public logout() {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.logout, "", this.httpOptions)
			.map(res =>  res.json())
			.subscribe(res => {
				console.log("logout result", res);
				if(res.data.OK) {
					this.ls.remove("token");
					this._store.dispatch(logoutAction(LogoutReason.UserChoice));
				}
			});
	}

	public register(user) {
		this._store.dispatch(authAction());
		this.http.post(apiUrls.auth.register, JSON.stringify(user), this.httpOptions)
			.map(res =>  res.json())
			.subscribe(res => {
				if (res && res.data && res.data.token) {
					this.ls.save("token", res.data.token);
					this._store.dispatch(loginAction(res.data.token));
				}
			});
	}
}
