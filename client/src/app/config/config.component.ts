import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

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

  constructor(storage: StorageService) { }

  ngOnInit() {
  }

}
