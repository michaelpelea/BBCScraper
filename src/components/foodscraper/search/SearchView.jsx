import React from 'react';
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

import ResultsView from '../results/ResultView.jsx';

import TagsInput from 'react-tagsinput'; 
import '../../../App.css';

const addKeys = [9, 13, 186]; 

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
]

const styles = theme => ({
    root: {
        marginTop: '8px'
    },
    searchButtonWrapper: {
        display: 'inline-flex',
        width: '50%',
        marginTop: '8px',
        paddingLeft: '8px'
    },
    textField: {
        width: '100%',
        minHeight: '40px',
        height: 'auto',
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
    },
    clearButton: {
        marginLeft: '26px'
    },
    alignRight: {
        paddingTop: '8px',
        textAlign: 'right'
    },
    button: {
        width: '120px',
        marginLeft: '16px'
    }
});

class SearchView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchContent: [],
            searchContentInput: '',
            showResult: false,
            open: false            
        }

        this.clearState = this.clearState.bind(this);
        this.search = this.search.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.handleTagsInput = this.handleTagsInput.bind(this);
        this.handleChangeTagsInput = this.handleChangeTagsInput.bind(this);
    }
    
    clearState() {
        this.setState({
            searchContent: [],
            searchContentInput: '',
            showResult: false
        });
    }

    search() {
        this.setState({
            showResult: true
        });
    }

    buttonClicked(event, type) {
        event.preventDefault();

        switch(type) {
            case "clear": this.clearState(); break;
            case "search": this.search(); break;
            default: break;
        }
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        });
    }

    handleTagsInput(tags) {
        this.setState({
            searchContent: tags
        });
    }

    handleChangeTagsInput( searchContentInput ) {
        this.setState({ searchContentInput })
    }

    render() {
        const { props } = this;
        const { classes, ...other } = props;
        const { searchContent, searchContentInput, showResult } = this.state;

        return (
            <div className={classes.root}>
                <TagsInput
                    className={classes.textField}
                    value={ searchContent }
                    onChange={ this.handleTagsInput }
                    inputValue={ searchContentInput }
                    onChangeInput={ this.handleChangeTagsInput }
                    addKeys = { addKeys }
                    inputProps = {{
                        placeholder: 'Add a search term'
                    }}
                    />

                <div className={classes.alignRight}>
                    <Button variant="contained" color="primary" 
                            className={classes.button}
                            onClick={event => this.buttonClicked(event, 'search')}>
                        Search
                    </Button>

                    <Button variant="contained" color="primary" 
                            className={classes.button + ' ' + classes.clearButton}
                            onClick={event => this.buttonClicked(event, 'clear')}>
                        Clear
                    </Button>
                </div>
                
                {
                    showResult === true ?
                        <ResultsView 
                            {...other}
                            clearState={this.clearState}
                            results={data}
                            />
                    : ''  
                }
            </div>
        )
    }
}

SearchView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchView);