import React from 'react';

class Chatbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName
        }
        this.onCompleteMessage = this.onCompleteMessage.bind(this);
        this.updateName = this.updateName.bind(this);
    }
    updateName(e) {         
        this.props.updateName(e.target.value);
    }
    onCompleteMessage(e) {
        if(e.key === 'Enter'){            
            this.props.onCompleteMessage(e.target.value);
            e.target.value = '';
        }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ this.state.userName } onBlur={ this.updateName } />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.onCompleteMessage } />
            </footer>
        );
    }
}

Chatbar.propTypes = {
    userName: React.PropTypes.string.isRequired,
    updateName: React.PropTypes.string.isRequired,
    onCompleteMessage: React.PropTypes.string.isRequired
}

export default Chatbar; 
