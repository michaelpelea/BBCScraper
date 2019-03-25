import React from 'react';
import PropTypes from 'prop-types';

import classNames from "classnames";
import { withStyles, Button } from '@material-ui/core';

const styles = themes => ({
    root: {
        padding: '10px 20px',
        borderRadius: 24,
        color: 'gray'
    },
    greenBackground: {
        backgroundColor: '#43C593',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: '#359d75'
        }
    },
    orangeBackground: {
        backgroundColor: 'rgb(249, 155, 84)',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: 'rgb(175, 75, 46)'
        }
    },
    blueBackground: {
        backgroundColor: 'rgb(44, 163, 223)',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: 'rgb(44, 136, 223)'
        }
    }
});

class CustomButton extends React.Component {
    render() {
        const { background, classes, className, ...rest } = this.props;

        const btnClasses = classNames({
            [classes.root]: true,
            [classes[background + 'Background']]: (background === null) ? false : background,
            [className]: className
          });

        return (
            <Button
                {...rest}
                className={btnClasses}
            ></Button>
        )
    }
}

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
    background: PropTypes.oneOf([
        'blue', 'green', 'orange', null
    ]),
    className: PropTypes.string
};

export default withStyles(styles)(CustomButton);