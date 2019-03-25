import React from 'react';
import PropTypes from "prop-types";

import { withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
        Select, MenuItem, InputLabel, TextField } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';

import CustomButton from '../../buttons/CustomButton.jsx';
import { getNumericCellEditor } from '../../../customClass.jsx';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import styles from '../../../assets/jsxStyles/result.jsx';

let openMoreDetailsModal = null;

const columnDefs = [
    {
        headerName: 'Search Term', field: 'searchterm', sortable: true, filter: true,
        cellRendererFramework: function(params) {
            return (
                <div className="ag-ellipsis" onClick={event => openMoreDetailsModal && openMoreDetailsModal(params.data)}>{params.data.searchterm}</div>
            )
        }
    },
    {
        headerName: 'Title', field: 'title', sortable: true, filter: true,
        cellRendererFramework: function(params) {
            return (
                <div className="ag-ellipsis" onClick={event => openMoreDetailsModal && openMoreDetailsModal(params.data)}>{params.data.title}</div>
            )
        }
    },
    {
        headerName: 'Description', field: 'description', sortable: true, filter: true,
        cellRendererFramework: function(params) {
            return (
                <div className="ag-ellipsis" onClick={event => openMoreDetailsModal && openMoreDetailsModal(params.data)}>{params.data.description}</div>
            )
        }
    },
    {
        headerName: 'Ingredients', field: 'ingredients', sortable: true, filter: true,
        cellRendererFramework: function(params) {
            return (
                <div className="ag-ellipsis" onClick={event => openMoreDetailsModal && openMoreDetailsModal(params.data)}>{params.data.ingredients}</div>
            )
        }
    },
    {
        headerName: 'Accuracy', field: 'accuracy', editable: true, sortable: true, filter: true,
        cellEditor: "numericCellEditor", 
        cellRendererFramework: function(params) {
            if (params.data.accuracy !== '') {
                return (
                    <div className="ag-edited">{params.data.accuracy}</div>
                )
            } else {
                return ( <div>{params.data.accuracy}</div> )
            }            
        }
    }
];

class ResultView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchName: '',
            searchLevel: '',
            open: false,
            openMoreDetails: false,

            // more details state
            title: '',
            description: '',
            ingredients: '',

            //ag table properties
            components: { numericCellEditor: getNumericCellEditor() }
        }

        this.renderMoreDetails = this.renderMoreDetails.bind(this);
        this.renderSaveLogForm = this.renderSaveLogForm.bind(this);
        this.resetState = this.resetState.bind(this);
        this.addToLog = this.addToLog.bind(this);
        this.saveToGS = this.saveToGS.bind(this);
        this.openGS = this.openGS.bind(this);
        this.openMoreDetailsModal = this.openMoreDetailsModal.bind(this);

        this.handleCloseMoreDetails = this.handleCloseMoreDetails.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);

        this.onGridReady = this.onGridReady.bind(this);
    }

    componentDidMount() {
        //sets the function within the component to the variable outside the scope
        //so the variable can be defined within the column headers cell rendered framework
        openMoreDetailsModal = this.openMoreDetailsModal;
    }

    resetState() {
        const { clearState } = this.props;

        if (clearState !== undefined) {
            clearState();
        }

        this.setState({
            searchName: '',
            searchLevel: '',
            open: false,
            openMoreDetails: false,

            // more details state
            title: '',
            description: '',
            ingredients: ''
        })
    }

    openMoreDetailsModal(params) {
        const { title, description, ingredients } = params;

        this.setState({
            openMoreDetails: true,
            title, description, ingredients
        });
    }
    
    addToLog() {
        const { searchName, searchLevel } = this.state;

        this.setState({
            open: false
        });
    }

    openAddToLogForm() {
        this.setState({
            open: true
        })
    }

    saveToGS() {
        const s_id = sessionStorage.getItem('s_id');

        if (s_id !== undefined && s_id !== null && s_id !== '') {
            console.log("saveToGS", s_id);
        }
    }

    openGS() {
        const s_id = sessionStorage.getItem('s_id');

        if (s_id !== undefined && s_id !== null && s_id !== '') {
            console.log("openGS", s_id);
        }
    }

    buttonClicked(event, type) {
        event.preventDefault();

        switch(type) {
            case "reset": this.resetState(); break;
            case "addToLog": this.openAddToLogForm(); break;
            case "saveToGS": this.saveToGS(); break;
            case "openGS": this.openGS(); break;
            default: break;
        }
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        });
    }
    
    handleClose() { 
        this.setState({ open: false });
    };

    handleCloseMoreDetails() { 
        this.setState({ openMoreDetails: false });
    };

    /**
     * 
     * @param {object} params - returned from ag-grid
     * Callback for grid after complete initialization 
     */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
          setTimeout(function() {
            params.api.sizeColumnsToFit();
          });
        });
    
        params.api.sizeColumnsToFit();
    }

    /**
     * container for more details alert modal
     */
    renderMoreDetails() {
        const { classes } = this.props;
        const { title, description, ingredients, openMoreDetails } = this.state;

        return(
            <Dialog
                open={openMoreDetails}
                onClose={this.handleCloseMoreDetails}
                aria-labelledby="form-dialog-title"
                > 
                <DialogTitle id="form-dialog-title" className={classes.dialogHeader}>{ title }</DialogTitle>
                <DialogContent>
                    <div>
                        <h4> Ingredients </h4>
                        <p> { ingredients } </p>
                    </div>
                    <div>                            
                        <h4> Description </h4>
                        <p> { description } </p>
                    </div>                
                </DialogContent>
            </Dialog>
        );
    }

    /**
     * Container for save alert modal form
     */
    renderSaveLogForm() {
        const { classes } = this.props;
        const { open, searchName, searchLevel } = this.state;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                > 
                <DialogTitle id="form-dialog-title" className={classes.dialogHeader}>Save search terms</DialogTitle>
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
                    <CustomButton background={'green'} variant="contained" onClick={this.addToLog}>Save</CustomButton>
                    <CustomButton background={null} variant="contained" onClick={this.handleClose}>Cancel</CustomButton>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { classes, results } = this.props;
        const { components } = this.state;

        return (
            <div className={classes.results}>
                { this.renderSaveLogForm() }
                { this.renderMoreDetails() }
                <div    
                    className={"ag-theme-material " + classes.agWrapper}
                    style={{ width: '100%', height: '320px', marginTop: '10px' }} 
                >
                    <AgGridReact
                        components={components}
                        columnDefs={columnDefs}
                        rowData={results}
                        onGridReady={this.onGridReady}
                        stopEditingWhenGridLosesFocus={true}
                        floatingFilter={true}
                        >
                    </AgGridReact>
                </div>
                
                <div className={classes.buttonWrapper}>      
                    <CustomButton background={'blue'} onClick={event => this.buttonClicked(event, 'addToLog')}>Add to Log</CustomButton>
                    <CustomButton background={'blue'} onClick={event => this.buttonClicked(event, 'saveToGS')}>Save To Google Sheet</CustomButton>
                    <CustomButton background={'blue'} onClick={event => this.buttonClicked(event, 'openGS')}>Open Google Sheet</CustomButton>
                    <CustomButton background={'blue'} onClick={event => this.buttonClicked(event, 'reset')}>Reset</CustomButton>
                </div>
            </div>
        );
    }
}

ResultView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultView);