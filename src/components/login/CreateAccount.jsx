import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { withStyles, Button, CardContent, Card, TextField, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';

import CustomPassword from '../password/CustomPassword.jsx';
import AlertView, { showAlert } from '../alert/AlertView.jsx';
import CustomButton from '../buttons/CustomButton.jsx';
import Logo from '../../assets/img/logo.png';
import styles from '../../assets/jsxStyles/login.jsx';

class CreateAccountView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        }

        this.createAccount = this.createAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        })
    }

    createAccount(event) {
        const { username, password, confirmPassword } = this.state;
        const { history } = this.props;

        event.preventDefault();

        if (password === confirmPassword && username !== '') {
            history.push('/connect');
        } else {
            if (password !== confirmPassword) {
                this.setState({
                    errorMessage: 'Passwords do not match.'
                })
            } else {
                showAlert('Username is required', 'danger');
            }
        }
    }

    render() {
        const { classes, navigateToLogin } = this.props;
        const { username, password, confirmPassword, errorMessage } = this.state;

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

                            { password && (
                                <CustomPassword password={password} /> 
                            )}                            
                        </div>

                        <div>
                            <FormControl 
                                    className={classes.formControl + ' ' + classes.textField} 
                                    error={(errorMessage !== '') ? true : false}
                                    variant="outlined">
                                <InputLabel
                                    ref={ref => {
                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                    }}
                                    htmlFor={`component-${errorMessage !== '' ? 'error' : 'outlined'}`}
                                >
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id={`component-${errorMessage !== '' ? 'error' : 'outlined'}`}
                                    type={'password'}
                                    value={confirmPassword}
                                    onChange={event => this.handleChange(event, 'confirmPassword')}
                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                />
                                {
                                    errorMessage !== '' && (
                                        <FormHelperText id="component-error-text"> { errorMessage } </FormHelperText>
                                    )
                                }                            
                            </FormControl>
                        </div>

                        <div className={classes.loginButtonWrapper}>
                            <Button onClick={navigateToLogin} className={classes.link}>
                                Login
                            </Button>
                            <CustomButton variant="contained" background={'green'}
                                onClick={this.createAccount}>Create Account</CustomButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

CreateAccountView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateAccountView);