import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [] // messages stored here
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
  }
  addNewUsername(event) {
    // console.log('newusername', event.target.value); 
    const oldUser = this.state.currentUser.name;  
    //console.log("oldUser: ", oldUser);  
    const update = {
      type: "notification",
      username: event,
      content: `${oldUser} changed their name to ${event}`
    };
    this.setState({
      currentUser: { name: event }
    });
    this.socket.send(JSON.stringify(update));
  }
  addNewMessage(newMessage) {
    // console.log('newMessage', newMessage);
    const msg = {
      type: "message",
      text: newMessage,
      username: this.state.currentUser.name
    };
    //console.log('sending this', msg);
    this.socket.send(JSON.stringify(msg));
  }
  componentDidMount() {
    this.socket.onmessage = (event) => {
      const incommingMessage = JSON.parse(event.data);

      // switch(incommingMessage.type) {
      //   case "message":
      //     // handle incoming message
      //     console.log("incommingMessage = message!");
      //     break;
      //   case "notification":
      //     // handle incoming notification
      //     console.log("incommingMessage = notification!!!");
      
      //     break;
      //   default:
      //     // show an error in the console if the message type is unknown
      //     //throw new Error("Unknown event type " + data.type);
      // }
      //console.log('new msg from server!!!!!:', incommingMessage);

      const newMessageFromServer = {
        id: incommingMessage.id,
        username: incommingMessage.username,
        content: incommingMessage.content,
        type: incommingMessage.type
      };
      const messages = this.state.messages.concat(newMessageFromServer);
      this.setState({ messages: messages });
    }
  }
  render() {
    //console.log(this.state.currentUser);
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages } oldUser={ this.state.currentUser.name} />
        <Chatbar
          userName={ this.state.currentUser.name }
          onCompleteMessage={ this.addNewMessage }
          updateName={ this.addNewUsername } />
      </div>
    );
  }
}

export default App;
