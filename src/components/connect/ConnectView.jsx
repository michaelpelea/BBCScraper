import React from 'react';
import PropTypes from "prop-types";

import { withStyles, Card, CardContent, TextField } from '@material-ui/core';

import AlertView, { showAlert } from '../alert/AlertView.jsx';
import CustomButton from '../buttons/CustomButton.jsx';
import { cancelAPI, connectWebsite } from '../axios/Api.jsx';

import styles from '../../assets/jsxStyles/connect.jsx';

class ConnectView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmitURL = this.handleSubmitURL.bind(this);
    }

    componentWillUnmount() {
        if (cancelAPI !== null) {
            cancelAPI();
        }
    }

    handleOnChange(name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmitURL(event) {
        const { url } = this.state;
        const { history } = this.props;
        
        if (url !== '') {
            //connects to website URL
            // connectWebsite()
            //     .then((data) => {
            //         console.log('data', data);
            //     })
            //     .catch((error) => {
            //         if (error.response) {
            //             // The request was made and the server responded with a status code
            //             // that falls out of the range of 2xx
            //             const resp = error.response;
                        
            //             console.log('Response', resp);
            //         } else if (error.request) {
            //             // The request was made but no response was received
            //             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //             // http.ClientRequest in node.js
            //             console.log(error.request);
            //           } else {
            //             // Something happened in setting up the request that triggered an Error
            //             console.log('Error', error.message);
            //           }
            //     });

            window.sessionStorage.setItem('connect_url', url);
    
            if (history !== undefined) {
                history.push('/foodscraper');
            }            
        } else {
            showAlert('The Website URL is required', 'info');
        }
    }

    render() {
        const { classes } = this.props;
        const { url } = this.state;

        return (
            <Card className={classes.card}>
                <AlertView />
                <CardContent>
                    <h2 className={classes.header}>Welcome to BBC Scraper</h2>

                    <section>
                        <p className={classes.note}>To start data scraping, please enter the URL website link to get data from.</p>
                        <TextField 
                            id="website-url"
                            label="Website URL"
                            className={classes.textField}
                            value={url}
                            onChange={event => this.handleOnChange('url', event)}
                            margin="normal"
                            />
                    </section>
                        
                    <div className={classes.buttonWrapper}>
                        <CustomButton variant="contained" onClick={this.handleSubmitURL}
                            background={'green'}
                            >Connect</CustomButton>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

ConnectView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConnectView);