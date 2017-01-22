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

@Injectable()
export class BackendService {

  constructor(
		private http: Http,
		private _router : Router,
		public _snackBar: MdSnackBar
	) { }

	private responseWrapper(request : Observable<Response>) {
		return request.map(res =>  <ResponseWrapper<any>> res.json())
      .do((res : ResponseWrapper<any>) => {
				console.log("Request result:", res);
				if(res.error == -1) {
					let message = "Auth error: " + res.message;
					this._snackBar.open(message, undefined, {
			      duration: 2000,
			    });
					//console.error("Auth error:", res.message);
					this._router.navigate(['/']);
				}
			}).catch((error: Response) => {
				let message = error.status + " " + error.statusText || 'Server error';
				this._snackBar.open(message, undefined, {
		      duration: 2000,
		    });
		    return Observable.throw(message);
			});
	}

	public post(url : string, body? : any, options? : RequestOptions) : Observable<any> {
		let _body = (typeof body == "string") ? body : JSON.stringify(body);
		let reqObservable : Observable<Response> = this.http.post(url, _body, options);
		return this.responseWrapper(reqObservable);
	}
}
