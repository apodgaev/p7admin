import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	private ls;

  constructor() {
		let s = window.localStorage;
		//let s = undefined;
		if(!s) {
			s = (() => {
				let _s = {};
				let _ls : any = {};
				_ls.getItem = function (key) {return _s[key.toString()]};
				_ls.setItem = function (key, value) {_s[key.toString()] = value.toString();}
				_ls.removeItem = function (key) { _s[key.toString()] = undefined; delete _s[key.toString()]};
				_ls.clear = function () {_s = {};};
				return _ls;
			})();
		}
		this.ls = s;
	}

	load(key: string) : any {
		let v = this.ls.getItem(key);
		return (!v)? v : JSON.parse(v);
	}

	save(key: string, value: any) {
		this.ls.setItem(key, JSON.stringify(value));
	}

	remove(key : string) {
		this.ls.removeItem(key);
	}

	clear() {
		this.ls.clear();
	}

	hasValue(key: string) : boolean {
		let v = this.load(key);
		return (!!v);
	}
}
