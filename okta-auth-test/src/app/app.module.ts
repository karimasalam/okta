import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';
import { TestComponent } from './test/test.component';
import { ProtectedComponent } from './protected/protected.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageListComponent } from './message-list/message-list.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptInterceptor } from './intercept.interceptor';
import { LoginComponent } from './login/login.component';

const config = {
  clientId: '0oad5uljqGL04qHsU4x6',
  issuer: 'https://dev-400156.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3002/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProtectedComponent,
    ProfileComponent,
    MessageListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    HttpClientModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
