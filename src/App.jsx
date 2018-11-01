import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

// import data from './posts.json';

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
    this.setState({ currentUser: {name: event.target.value}});
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

      //console.log('new msg from server!!!!!:', incommingMessage);

      const newMessageFromServer = {
        id: incommingMessage.id,
        username: incommingMessage.username,
        content: incommingMessage.content
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
        <MessageList messages={ this.state.messages } />
        <Chatbar userName={ this.state.currentUser.name } onCompleteMessage={ this.addNewMessage } updateName={ this.addNewUsername } />
      </div>
    );
  }
}


export default App;
