import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      userCount: 0,
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
  }
  addNewUsername(event) {
    const oldUser = this.state.currentUser.name;  
    const update = {
      type: 'notification',
      username: event,
      content: `${ oldUser } changed their name to ${ event }`
    };
    this.setState({
      currentUser: { name: event }
    });
    this.socket.send(JSON.stringify(update));
  }
  addNewMessage(newMessage) {
    const msg = {
      type: 'message',
      text: newMessage,
      username: this.state.currentUser.name
    };
    this.socket.send(JSON.stringify(msg));
  }
  componentDidMount() {
    this.socket.onmessage = (event) => {

      const incommingMessage = JSON.parse(event.data);

      switch(incommingMessage.type) {
        case 'message': {
          const newMessageFromServer = {
            id: incommingMessage.id,
            username: incommingMessage.username,
            content: incommingMessage.content,
            type: incommingMessage.type
          };
          const messages = this.state.messages.concat(newMessageFromServer);
          this.setState({ messages: messages });
          break;
        }
        case 'notification': {
          const newNotificationFromServer = {
            id: incommingMessage.id,
            username: incommingMessage.username,
            content: incommingMessage.content,
            type: incommingMessage.type
          };
          const notifications = this.state.messages.concat(newNotificationFromServer);
          this.setState({ messages: notifications });
          break;
        }
        case 'increment': {
          this.setState({
            userCount: incommingMessage.users
          })
          break;
        }
        case 'decrement': {
          this.setState({
            userCount: incommingMessage.users
          })
          break;
        }
      }
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-usercount"><span>{this.state.userCount}</span> users online</span>
        </nav>
        <MessageList messages={ this.state.messages } oldUser={ this.state.currentUser.name} />
        <Chatbar
          userName={ this.state.currentUser.name }
          onCompleteMessage={ this.addNewMessage }
          updateName={ this.addNewUsername }
        />
      </div>
    );
  }
}

export default App;
