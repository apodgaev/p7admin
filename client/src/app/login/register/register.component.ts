import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	private cred = {
		email : "",
		name : "",
		password: ""
	}

  constructor(public dialogRef: MdDialogRef<RegisterComponent>) { }

  ngOnInit() {
  }

	doRegister() {
		this.dialogRef.close(this.cred);
	}
}
