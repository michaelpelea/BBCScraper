import React from 'react';
import PropTypes from "prop-types";

import fs from 'fs';

import Button from '@material-ui/core/Button';

const logPath = "./log.txt";

class SaveLogButton extends React.Component {
    constructor(props) {
        super(props);

        this.readFile = this.readFile.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    readFile() {
        fs.readFile(logPath, 'utf-8', (err, data) => {
            if (err) {
                console.log('err', err);
            }

            console.log('data', data);
        })
    }

    onButtonClick(event) {
        //verify first if file exists
        this.readFile();
    }

    render() {
        const { classes, data, placeholder } = this.props;
        return (
            <Button variant="contained" color="secondary" 
                styles={classes}
                onClick={this.onButtonClick}>
                { placeholder }
            </Button>
        )
    }
}

SaveLogButton.propTypes = {
    classes: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    placeholder: PropTypes.string.isRequired
}

export default SaveLogButton;