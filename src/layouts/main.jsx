import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import routes from "../routes.jsx";

const styles = theme => ({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        // backgroundColor: '#eeeeee',
        justifyContent: 'center'
    },
    headerColor: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        backgroundColor: '#eeeeee'
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
            <div>
                <div className={classes.headerColor}></div>
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