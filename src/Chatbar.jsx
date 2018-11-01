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
        this.props.updateName(e.target.value); //App component
    }
    onCompleteMessage(e) {
        if(e.key === 'Enter'){            
            this.props.onCompleteMessage(e.target.value); //App component
            e.target.value = "";
        }
    }
    render() {
        return (
            <footer className="chatbar">
                {/* <p>Yo yo {this.props.userName}</p> */}
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ this.state.userName } onBlur={ this.updateName } />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.onCompleteMessage } />
            </footer>
        );
    }
}

export default Chatbar; 
