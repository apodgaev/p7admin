import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
	private config = {
		db : {
			dbuser : "",
			dbpassword : "",
			domain : "",
			port : "",
			account : ""
		},
		dbUri : ""
	};

  constructor(
		private storage: StorageService,
		private configService: ConfigService
	) { }

  ngOnInit() {
		if(this.storage.hasValue("config")) {
			this.config = this.storage.load("config");
		}
  }

	public save() {
		console.log("saving:",this.config);
		this.configService.setConfig(this.config.dbUri)
		.subscribe(
			res  => {
				console.log(res);
				this.storage.save("config", this.config);
			},
			error =>  console.log(error)
		);
	}
}
