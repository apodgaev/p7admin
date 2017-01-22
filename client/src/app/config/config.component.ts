import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
	private config = {
		db : {
			dbuser : undefined,
			dbpassword : undefined,
			domain : undefined,
			port : undefined,
			account : undefined
		}
	};

  constructor(
		private storage: StorageService,
		private router : Router,
		private configService: ConfigService
	) { }

  ngOnInit() {
		if(this.storage.hasValue("config")) {
			this.config = this.storage.load("config");
		}
  }

	private buildUri() : string {
		if(this.config.db) {
			let _ = this.config.db;
			return "mongodb://"+_.dbuser+":"+_.dbpassword+"@"+_.domain+":"+_.port+"/"+_.account;
		}
		return undefined;
	}

	public save() {
		let dbUri = this.buildUri();
		if(dbUri) {
			console.log("saving ", dbUri);
			this.configService.setConfig({dbUri:dbUri})
			.subscribe(
				res  => {
					console.log(res);
					if(res == "OK") {
						this.storage.save("config", this.config);
						this.router.navigate(['/dashboard']);
					}
				},
				error =>  {
					if(error.name && error.type == "Auth") {
						if(this.storage.hasValue("config")) {
							this.config = this.storage.load("config");
						}
					} else {
						console.error(error);
					}
				}
			);
		}
	}
}
