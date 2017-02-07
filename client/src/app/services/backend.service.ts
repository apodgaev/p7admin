import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

export interface ResponseWrapper<T> {
  error   : number;
  message : string;
  data    : T;
}

export class AuthError extends Error {
	public type = "Auth";
  constructor (public message: string){
		super(message);
  }
}

@Injectable()
export class BackendService {

  constructor(
		private http: Http,
		private _router : Router,
		public _snackBar: MdSnackBar
	) { }

	private openPopup(message : string) {
		this._snackBar.open(message, undefined, {
			duration: 2000,
		});
	}

	private responseWrapper(request : Observable<Response>) {
		return request.map(res =>  <ResponseWrapper<any>> res.json())
      .map((res : ResponseWrapper<any>) => {
				console.log("Request result:", res);
				if(res.error == -1) {
					//console.error("Auth error:", res.message);
				} else {
					return res.data || res;
				}
			}).catch((error: Response) => {
				console.log("Request error:", error);
				let result;
				if (error.status == 401 || error.status == 0) {
					let message = error.json().message;
					message = (message)? "Auth error: " + message : "Authorization failed!";
					this.openPopup(message);
					result = Observable.throw(new AuthError(message));
					if (!this._router.isActive('/', true)) {
						this._router.navigateByUrl('/');
					}
				} else {
					console.debug("error:", error);
					let message = error.statusText || 'Server error';
					this.openPopup(message);
			    result = Observable.throw(new Error(message));
				}
				return result;
			});
	}

	private token = "";
	public setAuthToken(token) {
		this.token = token;
	}

	public post(url : string, body? : any, options? : RequestOptions) : Observable<any> {
		let _options : RequestOptions = options;
		if (!_options) {
			_options = new RequestOptions({ headers: new Headers() });
		}
		_options.headers.append('Content-Type', 'application/json');
		if (this.token) {
			_options.headers.append('Authorization', 'Bearer ' + this.token);
		}
		let _body = (typeof body == "string") ? body : JSON.stringify(body);
		let reqObservable : Observable<Response> = this.http.post(url, _body, _options);
		return this.responseWrapper(reqObservable);
	}

	public get(url: string, options? : RequestOptions) : Observable<any> {
		let _options : RequestOptions = options;
		if (!_options) {
			_options = new RequestOptions({ headers: new Headers() });
		}
		_options.headers.append('Content-Type', 'application/json');
		if (this.token) {
			_options.headers.append('Authorization', 'Bearer ' + this.token);
		}
		let reqObservable : Observable<Response> = this.http.get(url, _options);
		return this.responseWrapper(reqObservable);
	}
}
