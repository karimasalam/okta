import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string;

  constructor(public oktaAuth: OktaAuthService) {

  }

  async ngOnInit() {
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();
    // user name is exposed directly as property
    this.userName = userClaims.name;

  }

}
