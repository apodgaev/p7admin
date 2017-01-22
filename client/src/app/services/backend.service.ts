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
					let message = "Auth error: " + res.message;
					this.openPopup(message);
					//console.error("Auth error:", res.message);
					this._router.navigate(['/']);
					return Observable.throw(new AuthError(message));
				} else {
					return res.data || {};
				}
			}).catch((error: Response) => {
				let result;
				if(error.status == 401) {
					result = Observable.throw(new AuthError("Authorization failed!"));
				} else {
					console.debug("error:", error);
					let message = error.status + " " + error.statusText || 'Server error';
					this.openPopup(message);
			    result = Observable.throw(new Error(message));
				}
				return result;
			});
	}

	public post(url : string, body? : any, options? : RequestOptions) : Observable<any> {
		let _options : RequestOptions;
		if(options) {
			options.headers.append('Content-Type', 'application/json');
			_options = options;
		} else {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			_options = new RequestOptions({ headers: headers });
		}
		let _body = (typeof body == "string") ? body : JSON.stringify(body);
		let reqObservable : Observable<Response> = this.http.post(url, _body, _options);
		return this.responseWrapper(reqObservable);
	}
}
