import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, CardContent, Card, TextField } from '@material-ui/core';

import AlertView, { showAlert } from '../alert/AlertView.jsx';
import CustomButton from '../buttons/CustomButton.jsx';

import Logo from '../../assets/img/logo.png';

const styles = themes => ({
    card: {
        maxWidth: 350,
        width: '100%',
        padding: '0 24px 24px 24px',
        marginTop: 60,
        height: 420
    },
    cardContent: {
        paddingTop: 24
    },
    header: {
        textAlign: 'center',
        paddingTop: 16
    },
    content: {
        paddingTop: 24
    },
    textField: {
        width: '100%'
    },
    loginButtonWrapper: {
        textAlign: 'right',
        paddingTop: 24
    },
    logo: {
        width: 150
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
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;

        return (
            <Card className={classes.card}>
                <AlertView />
                <CardContent className={classes.cardContent}>
                    <div className={classes.header}>
                        <img src={Logo} className={classes.logo} alt={'Company Logo'}/>
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
                            <CustomButton variant="contained" background={'green'}
                                onClick={this.login}>Login</CustomButton>
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