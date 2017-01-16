import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Router } from '@angular/router';

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
	) { }

	private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.status + " " + error.statusText || 'Server error');
  }

	private responseWrapper(request : Observable<Response>) {
		return request.map(res =>  <ResponseWrapper<any>> res.json())
      .do((res : ResponseWrapper<any>) => {
				console.log("Request result:", res);
				if(res.error == -1) {
					console.error("Auth error:", res.message);
					this._router.navigate(['/']);
				}
			}).catch(this.handleError);
	}

	public post(url : string, body? : any, options? : RequestOptions) : Observable<any> {
		let _body = (typeof body == "string") ? body : JSON.stringify(body);
		let reqObservable : Observable<Response> = this.http.post(url, _body, options);
		return this.responseWrapper(reqObservable);
	}
}
