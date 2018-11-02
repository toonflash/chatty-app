import React from 'react';
import Message from './Message.jsx';

function MessageList(props) {
    const messages = props.messages;
    const messageItem = messages.map((message) =>
        <Message 
            key = {message.id}
            user = {message.username}
            content = {message.content}
            type = {message.type} />
    );
    return(
    <main className="messages">
        {messageItem}
    </main>
    )
}

MessageList.propTypes = {
    messages: React.PropTypes.string.isRequired
}

export default MessageList;