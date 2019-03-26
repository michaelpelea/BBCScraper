import React from 'react';
import PropTypes from 'prop-types';

import ReactCardFlip from 'react-card-flip';

import LoginView from './LoginView.jsx';
import CreateAccount from './CreateAccount.jsx';

class MainLoginView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isFlipped: false
        };
        
        this.handleFlip = this.handleFlip.bind(this);
    }

    handleFlip(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        const {...other} = this.props;

        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <LoginView key="front"
                    {...other}
                    navigateToRegister={this.handleFlip}
                    >
                </LoginView>
        
                <CreateAccount key="back"
                    {...other}
                    navigateToLogin={this.handleFlip}
                    >
                </CreateAccount>
            </ReactCardFlip>
        )
    }
}

export default MainLoginView;