import React from 'react';
import PropTypes from "prop-types";

import Table from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = themes => ({    
    results: {
        marginTop: 16
    },
    buttonWrapper: {
        paddingTop: 8, 
        textAlign: 'center',
        "& button": {
            marginRight: 16,
            backgroundColor: '#5245e0',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#362ab2'
            }
        }
    },
    formControl: {
        marginTop:'15.5px',
        marginLeft: '20px',
        minWidth: 120,
    },
    searchName: {
        width: 'calc(100% - 140px)'
    },
    dialogActions: {
        paddingRight: 8,
        '& button': {
            width: 120
        }
    }
})

const columns = [
    {
        title: 'Search Term', field: 'searchterm'
    },
    {
        title: 'Title', field: 'title'
    },
    {
        title: 'Description', field: 'description'
    },
    {
        title: 'Ingredients', field: 'ingredients'
    },
    {
        title: 'Accuracy', field: 'accuracy'
    }
];

const data = [
    {
        searchterm: 'American Pizza',
        title: 'Sloppy Joe pizza breads',
        description: 'Take a jar of tomato sauce, beef mince, mozzarella cheese and a baguette and you have this speedy supper - serve with basil',
        ingredients: '500g pack lean beef mince 350g jar tomato and chilli pasta sauce 1 baguette 2 x 125g balls mozzarella, drained and torn small handful basil, torn',
        accuracy: 2
    },
    {
        searchterm: 'American Pizza',
        title: 'Spicy salami s\'mores',
        description: 'Ever tried a savoury version of a classic American marshmallow s\'more? If not, this pizza-inspired stack with taleggio cheese, salami and olives is a good place to start...',
        ingredients: '',
        accuracy: 3
    },
    {
        searchterm: 'American Pizza',
        title: 'Margherita s\'mores',
        description: 'We gave American-style s’more marshmallow sandwiches a savoury makeover. This version with pizza flavours is ideal for dipping into tomato soup',
        ingredients: '16 Ritz crackers 8 slices mozzarella (½ a ball) (vegetarian brand, if required) 8 sundried tomatoes 8 fresh basil leaves',
        accuracy: 3
    }
];

class ResultView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchName: '',
            searchLevel: '',
            open: false            
        }

        this.renderSaveLogForm = this.renderSaveLogForm.bind(this);
        this.resetState = this.resetState.bind(this);
        this.addToLog = this.addToLog.bind(this);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    resetState() {
        const { clearState } = this.props;

        if (clearState !== undefined) {
            clearState();
        }

        this.setState({
            searchName: '',
            searchLevel: '',
            open: false
        })
    }
    
    addToLog() {
        const { searchName, searchLevel } = this.state;

        this.setState({
            open: false
        })
        console.log("True", searchName, searchLevel);
    }

    openAddToLogForm() {
        this.setState({
            open: true
        })
    }

    buttonClicked(event, type) {
        event.preventDefault();

        switch(type) {
            case "reset": this.resetState(); break;
            case "addToLog": this.openAddToLogForm(); break;
            case "saveToGS": this.openAddToLogForm(); break;
            case "openGS": this.openAddToLogForm(); break;
            default: break;
        }
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        });
    }

    handleClickOpen() {
        this.setState({ open: true });
    };
    
    handleClose() {
        this.setState({ open: false });
    };

    renderSaveLogForm() {
        const { classes } = this.props;
        const { open, searchName, searchLevel } = this.state;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Save search terms</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the name and level of the search to be saved on the log file
                    </DialogContentText>

                    <div>
                        <TextField
                            className={classes.searchName}
                            label="Search Name"
                            id="search-name"
                            rows={4}
                            onChange={event => this.handleChange(event, 'searchName')}
                            value={searchName}
                            margin="normal"
                            />

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="search-level">Search Level</InputLabel>
                            <Select
                                value={searchLevel}
                                onChange={event => this.handleChange(event, 'searchLevel')}
                                inputProps={{
                                name: 'searchLevel',
                                id: 'search-level',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                                <MenuItem value={'C'}>C</MenuItem>
                                <MenuItem value={'D'}>D</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button variant="contained" onClick={this.addToLog} color="primary">
                        Save
                    </Button>
                    <Button variant="contained" onClick={this.handleClose} color="inherit">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.results}>
                { this.renderSaveLogForm() }
                <Table
                    columns={columns}
                    data={data}
                    title={'Results'}
                    options={{
                        columnsButton: true,
                        exportButton: true,
                        paging: true,
                        maxBodyHeight: 320,
                        showEmptyDataSourceMessage: true
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'No record(s) to display'
                        }
                    }}></Table>
                <div className={classes.buttonWrapper}>                                
                    <Button variant="outlined" onClick={event => this.buttonClicked(event, 'addToLog')}>Add to Log</Button>
                    <Button variant="outlined" onClick={event => this.buttonClicked(event, 'saveToGS')}>Save To Google Sheet</Button>
                    <Button variant="outlined" onClick={event => this.buttonClicked(event, 'openGS')}>Open Google Sheet</Button>
                    <Button variant="outlined" onClick={event => this.buttonClicked(event, 'reset')}>Reset</Button>
                </div>
            </div>
        );
    }
}

ResultView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultView);