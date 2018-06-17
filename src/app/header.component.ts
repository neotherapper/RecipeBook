import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }

}
