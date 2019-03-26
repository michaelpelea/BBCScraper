import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import routes from "../routes.jsx";
import styles from "../assets/jsxStyles/mainLayout.jsx";

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