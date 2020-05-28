import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

interface Message {
  date: string;
  text: string;
}


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Array<Message> [];


  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    this.http.get(
      '/api/messages'
    ) .subscribe(response => console.log(response));

  }


}
