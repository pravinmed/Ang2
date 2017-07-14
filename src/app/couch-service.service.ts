import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class CouchServiceService {

  private url = 'http://localhost:3000';  
 // private url = 'http://10.0.208.23:3000';  
  private socket;

  constructor() { }


sendMessage(message){
  console.log(" Sending back ");
    this.socket.emit('message', message);    
  }
  
  public getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
        // to send the callback to the nodejs
        //this.sendMessage("Call Back ");

      });
     
    });     
    return observable;
  }  

}
