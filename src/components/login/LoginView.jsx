import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, CardContent, Card, TextField, Button } from '@material-ui/core';

import AlertView, { showAlert } from '../alert/AlertView.jsx';

const styles = themes => ({
    card: {
        maxWidth: 350,
        width: '100%',
        padding: '0 24px 24px 24px',
        marginTop: '56px',
        height: 300
    },
    cardContent: {
        paddingTop: 24
    },
    header: {
        textAlign: 'center',
        '& h4': {
            marginTop: 0
        }
    },
    textField: {
        width: '100%'
    },
    loginButtonWrapper: {
        textAlign: 'right',
        paddingTop: 24
    }
});

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.login = this.login.bind(this);
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        })
    }

    login(event) {
        const { username, password } = this.state;
        const { history } = this.props;

        event.preventDefault();

        if (username !== '' && password !== '') {
            history.push('/connect');
        } else {
            showAlert('Please enter valid credentials', 'danger');
        }

        console.log('credentials', username, password);
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;

        return (
            <Card className={classes.card}>
                <AlertView />
                <CardContent className={classes.cardContent}>
                    <div className={classes.header}>
                        <h2>BBC Scraper</h2>
                    </div>
                    <div className={classes.content}>
                        <div>
                            <TextField
                                id="outlined-email-input"
                                label="Username / Email"
                                className={classes.textField}
                                value={username}
                                onChange={event => this.handleChange(event, 'username')}
                                autoComplete="current-username"
                                margin="normal"
                                variant="outlined"
                                />
                        </div>

                        <div>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                className={classes.textField}
                                value={password}
                                onChange={event => this.handleChange(event, 'password')}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                />
                        </div>

                        <div className={classes.loginButtonWrapper}>
                            <Button variant="contained" color="primary" 
                                    onClick={this.login}>
                                Login
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginView);