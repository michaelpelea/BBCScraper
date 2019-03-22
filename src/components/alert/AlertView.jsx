import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
      padding: theme.spacing.unit / 2,
    },
    success: {
        '& div': {
            backgroundColor: '#43a047'
        }
    },
    warning: {
        '& div': {
            backgroundColor: '#fb8c00'
        }
    },
    danger: {
        '& div': {
            backgroundColor: '#e53935'
        }
    },
    info: {
        '& div': {
            backgroundColor: '#00acc1'
        }
    }
});

let openAlertView = null;

class AlertView extends React.Component {    
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            message: '',
            type: ''
        };

        this.openAlertView = this.openAlertView.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openAlertView(message, type) {
        this.setState({
            message: message,
            open: true,
            type: type
        });
    }

    handleClose() {
        this.setState({
            open: false,
            message: '',
        });
    }

    componentDidMount() {
        openAlertView = this.openAlertView;
    }

    render() {
        const { message, open, type } = this.state;
        const { classes } = this.props;

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={ open }
                autoHideDuration={ 2000 }
                onClose={ this.handleClose }
                ContentProps={{ 'aria-describedby': 'message-id' }}
                message={ message }
                className={ classes[type] }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={ classes.close }
                        onClick={ this.handleClose }
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
                />
        );
    }
}

AlertView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AlertView);

export function showAlert(message, type) {
    openAlertView(message, type);
}