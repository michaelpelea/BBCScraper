import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Button, CardContent, Card, TextField } from '@material-ui/core';

import AlertView, { showAlert } from '../alert/AlertView.jsx';
import CustomButton from '../buttons/CustomButton.jsx';
import Logo from '../../assets/img/logo.png';
import styles from '../../assets/jsxStyles/login.jsx';

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
        const { classes, navigateToRegister } = this.props;
        const { username, password } = this.state;
        console.log("dsada", this.props);
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
                                margin="normal"
                                variant="outlined"
                                autoComplete="new-username"
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
                                margin="normal"
                                variant="outlined"
                                autoComplete="new-password"
                                />
                        </div>

                        <div className={classes.loginButtonWrapper}>
                            <Button onClick={navigateToRegister} className={classes.link}>
                                Register
                            </Button>
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