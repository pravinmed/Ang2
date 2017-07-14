// Get dependencies
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const zemq = require('zeromq');  
var sock = require('socket.io')(http);

/*const EventEmitter = require('events').EventEmitter

// create an instance of the EventEmitter object
const eventEmitter = new EventEmitter()

// register a listener for the 'randomString' event
eventEmitter.on('randomString', function (randomStr) {
  console.log('Received the string: ' + randomStr)
})*/

// trigger an event called 'randomString' and send
// a randomly selected string to the listeners


var HOST = '127.0.0.1';
var PORT = 5678;
  
  var connected = false;
var counter = 0;  
toSendMessages ='';

var socket = zemq.socket('sub');
socket.connect('tcp://10.0.208.23:12345'); 
socket.subscribe('TopicB');
socket.on("message", function (topic,message) {  
    // Convert the message into a string and log to the console.
    //console.log(topic.toString("utf-8")," topic ");
    
    {
      this.toSendMessages = message.toString("utf-8");

      //console.log("Received message: " + this.toSendMessages.toString("utf8"));
      if(connected === true)
      {
        // console.log(" Sending the message ");
         sock.send(this.toSendMessages);
         
      }
    } 
    //eventEmitter.emit('zeroMessage', this.toSendMessages);
});

// Get our API routes
const api = require('./server/routes/api');



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));

sock = sock.listen(http);

sock.on('connection', function(socketio){
  console.log('A user connected');
  connected = true;
  //Send a message after a timeout of 4seconds
  /*setTimeout(function(){
    console.log('Send message now ',this.toSendMessages);
    if(this.toSendMessages !== '')
    {
     socketio.send(this.toSendMessages);
        this.toSendMessages='';
     }}, 4000);*/
    socketio.on('message',function(data){
          console.log("Call Back from the Application is  ",data);
    });
  socketio.on('disconnect', function () {
      connected =  false;
    console.log('A user disconnected');
  });
});