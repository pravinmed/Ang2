import { Component, OnInit,Input,Output } from '@angular/core';
import {Subject, Observable}  from 'rxjs/Rx';
import * as EventSource from 'eventsource'

import {CouchServiceService} from "./couch-service.service";


@Component({
  selector: 'app-couch',
  templateUrl: './couch.component.html',
  styleUrls: ['./couch.component.css'],
  providers: [CouchServiceService]
})
export class CouchComponent implements OnInit {
 // HOST = '127.0.0.1';
 //PORT = 5678;
  messages :any;
  connection;
  message;
  messageListFromServer:any;
  messageFromServer:any ;
  constructor(private couchService:CouchServiceService) {
     
   }

  ngOnInit() {
    this.connection = this.couchService.getMessages().subscribe(message => {
         
         this.messageFromServer = message;
         var messageList = this.messageFromServer.split(":");
          //console.log(" In the messageFromServer ",this.messageFromServer);
    });

  }

  onMessageRecd(topic,message)
  {
    this.messageFromServer = message;
    console.log(this.messageFromServer,"  Message  ");
  }

}
