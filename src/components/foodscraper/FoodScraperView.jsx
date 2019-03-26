import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import { withStyles, Card, CardContent, TextField } from '@material-ui/core';

import FoodScraperRoutes from './routes.jsx';
import styles from '../../assets/jsxStyles/foodscraper.jsx';

class FoodScraperView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connectUrl: '',
            sheetId: ''
        }
        
        this.retrieveWebsiteURL = this.retrieveWebsiteURL.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.switchRoutes = this.switchRoutes.bind(this);
    }

    componentDidMount() {
        this.retrieveWebsiteURL();
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        });

        if (name === 'sheetId') {            
            sessionStorage.setItem('s_id', event.target.value);
        }
    }

    retrieveWebsiteURL() {
        const connectUrl = sessionStorage.getItem('connect_url');
        const { history } = this.props;

        if (connectUrl !== undefined && connectUrl !== '' && connectUrl !== null) {
            this.setState({
                connectUrl
            });
        } else {
            if (history !== undefined) {
                history.push('/connect');
            }
        }
    }

    switchRoutes() {
        return (
            <Switch>
                {FoodScraperRoutes.map((prop, key) => {
                    if (prop.redirect !== undefined && prop.redirect === true) {
                        return <Redirect to={prop.path} from={prop.from} key={key}></Redirect>
                    } else {
                        return <Route 
                                    path={prop.path} 
                                    component={prop.component}
                                    key={key}></Route>
                    }                    
                })}
            </Switch>
        )        
    }

    render() {
        const { connectUrl, sheetId } = this.state;
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <form className={classes.container}>
                        <div className={classes.header}>
                            <div>
                                <TextField
                                    className={classes.websiteUrl}
                                    label="Website URL"
                                    id="website-url"
                                    value={connectUrl}
                                    margin="normal"
                                    disabled
                                    />
                                </div>
                            <div>
                                <TextField
                                    className={classes.sheetId}
                                    label="Google Sheet ID"
                                    id="sheet-id"
                                    onChange={event => this.handleChange(event, 'sheetId')}
                                    value={sheetId}
                                    margin="normal"
                                    />
                            </div>
                        </div>

                        <div className={classes.content}>
                            { this.switchRoutes() }
                        </div>
                    </form>
                </CardContent>
            </Card>
        )
    }
}

FoodScraperView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FoodScraperView);