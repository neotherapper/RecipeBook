import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.auth.user.subscribe(
      (user) => {
        console.log('%cauth', 'color:orange', user);
      }
    );
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
