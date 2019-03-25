import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import routes from "../routes.jsx";

const styles = theme => ({
    containerWrapper: {
        position: 'relative',
        zIndex: 250,
        height: '100%'
    },
    container: {
        position: 'relative',
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        paddingBottom: '5px'
    },
    background: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        height: '180px',
        width: '100%',
        '& > div:first-child': {
            height: 180,
            backgroundColor: 'rgb(250, 119, 69)',
            backgroundImage: 'linear-gradient(to right, rgb(250, 119, 69), rgb(243, 196, 66))'
        }
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.switchRoutes = this.switchRoutes.bind(this);
    }
    
    switchRoutes() {
        return (
            <Switch>
                {
                    routes.map((prop, key) => {                    
                        if (prop.redirect !== undefined && prop.redirect === true) {
                            return (
                                <Redirect to={prop.path} from={prop.from} key={key}/>
                            );
                        } else {
                            return (
                                <Route
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                    />
                            );
                        }       
                    })
                }
            </Switch>
        );
    }

    render() {
        const { classes } = this.props;

        return (     
            <div className={classes.containerWrapper}>
                <div className={classes.background}>
                    <div className={classes.header}></div>
                </div>
                <div className={classes.container}>
                    { this.switchRoutes() }
                </div>
            </div>        
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);