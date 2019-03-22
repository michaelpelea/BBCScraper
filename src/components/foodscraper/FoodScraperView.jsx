import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import FoodScraperRoutes from './routes.jsx';

//Tab, Enter and semi-colon

const styles = theme => ({
    container: {
        position: 'relative'
    },    
    card: {
        maxWidth: 1200,
        width: '100%',
        padding: '0 24px 24px 24px',
        marginTop: '8px',
        height: 'calc(100% - 40px)'
    },
    cardContent: {
        paddingTop: 0
    },  
    buttonWrapper: {
        paddingTop: '16px'
    },
    openGoogleButton: {
        width: '32%',
        marginLeft: '16px'
    },
    leftButtonHalfWidth: {
        width: '32%',
        marginRight: '16px',
        backgroundColor: '#fb8c00',
        color: '#ffffff'
    },
    rightButtonHalfWidth: {
        width: '32%'
    },
    header: {
        '& button': {
            width: '15%',
            height: '36px',
            marginTop: '24px'
        },
        '& > div': {
            display: 'inline-flex',
            width: '50%',
            '& b': {
                marginRight: '8px'
            }
        }
    },
    sheetId: {
        width: '100%'
    },
    websiteUrl: {
        width: 'calc(100% - 24px)'
    },
    content: {
        paddingTop: '8px'
    }
});

class FoodScraperView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connectUrl: '',
            // searchName: '',
            // searchLevel: '',
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

                        {/* <div className={classes.buttonWrapper}>
                            <div className={classes.secondRow}>
                                <Button variant="contained" 
                                        className={classes.leftButtonHalfWidth}>
                                    Save to log
                                </Button>

                                <Button variant="contained" color="secondary" 
                                        className={classes.rightButtonHalfWidth}>
                                    Save to Google Sheet
                                </Button>

                                
                                <Button variant="contained" color="secondary" 
                                        className={classes.openGoogleButton}>
                                    Open Google Sheet
                                </Button>
                            </div>                            
                        </div> */}
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