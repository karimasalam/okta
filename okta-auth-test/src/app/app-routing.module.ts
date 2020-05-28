import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuthGuard } from '@okta/okta-angular';
import { ProtectedComponent } from './protected/protected.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageListComponent } from './message-list/message-list.component';
import { LoginComponent } from './login/login.component';

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}


const CALLBACK_PATH = 'implicit/callback';

const routes: Routes = [
  {
    path: CALLBACK_PATH,
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'messages',
    component: MessageListComponent,
    canActivate: [ OktaAuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
