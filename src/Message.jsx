import React from 'react';

function Message({user, type, content}) {
    return (
        <div>
            {type === 'message' ?
                <div className="message">
                    <span className="message-username">{ user }</span>
                    <span className="message-content">{ content }</span>
                </div> :
                <div className="notification">
                    <span className="notification-content">{ content }</span>
                </div>
            }
        </div>
    )
}

Message.propTypes = {
    user: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
}

export default Message;