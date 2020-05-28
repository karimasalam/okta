import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-400156.okta.com',
    clientId: '0oad5uljqGL04qHsU4x6',
    issuer: 'https://dev-400156.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3002/implicit/callback',
    scope: 'openid profile',

    authParams: {
      pkce: true,
      responseType: ['token', 'id_token'],
      display: 'page',
      scopes: ['openid', 'email', 'profile']

    },
    features: {
      registration: true,
    },
    idps: [
      {type: 'GOOGLE', id: '0oad61xsvmLdnStcB4x6'}
      ],
    idpDisplay : 'SECONDARY'

  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl({
      el: '#okta-signin-container'},
      (res) => {
        if (res.status === 'SUCCESS') {
          localStorage.setItem('claim', res.claims) ;
          this.signIn.tokenManager.add('my_id_token', res[0]);
          this.signIn.tokenManager.add('my_access_token', res[1]);
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }

}
