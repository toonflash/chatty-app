// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //console.log('Client connection to server established');
  let onlineUsers = wss.clients.size
  //console.log(onlineUsers);

  const userNumber = {
    users: onlineUsers,
    type: 'increment'
  };

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(userNumber));
  });

  ws.on('message', function incoming(data) {
    const msg = JSON.parse(data);
    //console.log("Receiving type from client :", msg.type);
    const id = uuidv4();

    if (msg.type === 'notification') {

      const id = uuidv4();
      const nameToSendBack = {
        id: id,
        username: msg.username,
        content: msg.content,
        type: 'notification'
      };

      wss.clients.forEach(function each(client) {
        if (client.readyState) {
          client.send(JSON.stringify(nameToSendBack));
        }
      });

    } else {
      const messageToSendBack = {
        id: id,
        username: msg.username,
        content: msg.text,
        type: "message"
      };

      wss.clients.forEach(function each(client) {
        if (client.readyState) {
          client.send(JSON.stringify(messageToSendBack));
          //console.log("RESPONSE FROM SERVER: ",JSON.stringify(messageToSendBack));
        }
      });

    }
  });

  // Set up a callback for when a client closes the socket. This usually means they've closed their browser.
  ws.on('close', function() {
    console.log('Client disconnected');
    const userNumberDown = {
      users: wss.clients.size,
      type: 'decrement'
    };
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userNumberDown));
    });
  });

});









