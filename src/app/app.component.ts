import {HeaderComponent} from "./header/header.component";
import {CouchComponent} from "./couch.component";
import { Component, OnInit,Input,Output } from '@angular/core';
import {CouchServiceService} from "./couch-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css'],
  providers: [CouchServiceService]
  
    
})
export class AppComponent implements OnInit{
  title = 'Hello World This app works now using Nodejs!';
  connection;
   patientInfo:any;
   couchInfo:any;
   setupNotes:any;
   setupPhoto:any;
   messageFromSer:any;
   first:any;
   last:any;
   patientId:any;
   imgSrc;
   timeNow:string;
    fr ;
    
    dob:string;
    patientCheckString:string;
    patientPic:any;
    planLabel:any;
    fraction:any;
   patientChecked: boolean; // checkbox
   patOrientation:any;
   couchList:any;
   blinkCounter:any;
   constructor(private couchService:CouchServiceService) {
      this.patientInfo="";
      this.couchInfo="Lat=58.6,Lng=78.4,Vrt=69.4";
      this.imgSrc = " ";
      this.messageFromSer="";
      this.patientChecked=false;
     this.dob="";
     this.blinkCounter = 1;
     this.patientPic= "http://localhost:4325/nopat.png";
     this.first="";
     this.last="";
     this.patientId = "";
     this.fraction = "";
     this.planLabel = "";
     this.patOrientation = "";
     this.timeNow ="";
     if(this.patientChecked)
     {
       this.patientCheckString = "Patient Verified";
     } else {
       this.patientCheckString = "Patient Verification Pending";
     }
     this.couchList = new Array(3);
     this.couchList= ["Lat : --","Vrt : -- ","Lng : --"];
   }

   onPatientClicked(event)
   {
     
     this.couchService.sendMessage(this.patientChecked);
    if(this.patientChecked === true)
     {
       this.patientCheckString = "Patient Verified";
     } else {
       this.patientCheckString = "Patient Verification Pending";
     }
     console.log(" On Click event ",this.patientCheckString);
     
   }


  ngOnInit() {
   
      this.imgSrc = "";
      this.patientPic= "http://localhost:4325/nopat.png";
      this.blinkCounter=1;
      //this.couchList.Clear();
      /*this.couchList=[];
      this.couchList.push("Lat : 85");
      this.couchList.push("Lng : 85");
      this.couchList.push("Vrt : 65");*/
       this.couchList[0] ="Lat : 85";
      this.couchList[1] = "Lng : 85";
      this.couchList[2] = "Vrt : 65";
      console.log(this.couchList);
      this.dob="";
      this.connection = this.couchService.getMessages().subscribe(message => {
         this.blinkCounter= (this.blinkCounter+ 1) % 2;
         
         this.messageFromSer = message;
          let messageList = this.messageFromSer.split("|");
          
          if(messageList.length >1 )
          {
            
            if(messageList[0].trim() === 'Patient')  
            {
              console.log("Message from Patient ",messageList[1]);
             
              this.patientInfo = messageList[1];
              let patInfo = this.patientInfo.split(",");
             
              if(patInfo.length >= 2)
              {
                this.first = patInfo[0];
                this.last = patInfo[1];
                this.patientId = patInfo[2];
                
              }
            } 
             if(messageList[0].trim() === 'DOB')
            {
              console.log("Message in DOB  ",messageList[1]);
              this.dob = messageList[1];
            }
            else if(messageList[0].trim() === 'PatientPhoto')
            {
              console.log("Message in Patient Photo   ",messageList[1]);
              this.patientPic = "http://localhost:3000/"+messageList[1];
            }
            else if(messageList[0].trim() === 'Couch')
            {
              this.couchInfo = messageList[1];
              let cch = this.couchInfo.split(",");
              if(cch.length == 3)
              {
                this.couchList=[];
                this.couchList[0] = cch[0];
                this.couchList[1] = cch[1];
                this.couchList[2] = cch[2];
              }
            } else if(messageList[0].trim() === 'Activity')
            {
              this.setupNotes = messageList[1];
            } else if(messageList[0].trim() === 'SetupPhotos')
            {
              this.imgSrc = "http://localhost:4325/"+messageList[1];  
            }  else if(messageList[0] === 'PatientOrientation')
            {
              this.patOrientation = "http://localhost:4325/"+messageList[1];  
            } else if(messageList[0].trim() === 'TimeNow')
            {
               this.timeNow = messageList[1];
            }else if(messageList[0].trim() === 'Clear')
            {
              console.log("Clear the message    ");
              this.patientInfo = "";
              this.couchInfo = "";
              this.setupNotes = "";
              this.imgSrc = "";
              this.patientPic="";
              this.patientChecked=false;
              this.first="";
              this.last="";
              this.dob="";
              this.patientId="";
              this.timeNow="";
             
            }
           } 
          
    });
  }
}
