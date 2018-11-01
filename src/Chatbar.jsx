import React from 'react';

class Chatbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName
        }
        this.onCompleteMessage = this.onCompleteMessage.bind(this);
        // this.updateName = this.updateName.bind(this); ===========> might be needed later on? maybe not
    }
    // updateName(event) { ===========> might be needed later on? maybe not
    //     console.log('keypressed!', event.target.value);
    //     console.log('this.props.userName', this.props.userName);
    //     this.setState({ userName: event.target.value });
    //     console.log('state!!!!!', this.state);
    // }
    onCompleteMessage(event) {
        if(event.key === 'Enter'){            
            this.props.onCompleteMessage(event.target.value); //App component
            event.target.value = "";
        }
    }
    render() {
        return (
            <footer className="chatbar">
                {/* <p>Yo yo {this.props.userName}</p> */}
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ this.state.userName } onKeyUp={ this.props.updateName } />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.onCompleteMessage } />
            </footer>
        );
    }
}

export default Chatbar; 
