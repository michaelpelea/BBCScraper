import React from 'react';
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import ResultsView from '../results/ResultView.jsx';
import CustomButton from '../../buttons/CustomButton.jsx';

import TagsInput from 'react-tagsinput'; 

import styles from '../../../assets/jsxStyles/search.jsx';

//tab, enter and semi-colon
const addKeys = [9, 13, 186]; 

const data = [
    {
        searchterm: 'American Pizza',
        title: 'Sloppy Joe pizza breads',
        description: 'Take a jar of tomato sauce, beef mince, mozzarella cheese and a baguette and you have this speedy supper - serve with basil',
        ingredients: '500g pack lean beef mince 350g jar tomato and chilli pasta sauce 1 baguette 2 x 125g balls mozzarella, drained and torn small handful basil, torn',
        accuracy: ''
    },
    {
        searchterm: 'American Pizza',
        title: 'Spicy salami s\'mores',
        description: 'Ever tried a savoury version of a classic American marshmallow s\'more? If not, this pizza-inspired stack with taleggio cheese, salami and olives is a good place to start...',
        ingredients: '',
        accuracy: ''
    },
    {
        searchterm: 'American Pizza',
        title: 'Margherita s\'mores',
        description: 'We gave American-style s’more marshmallow sandwiches a savoury makeover. This version with pizza flavours is ideal for dipping into tomato soup',
        ingredients: '16 Ritz crackers 8 slices mozzarella (½ a ball) (vegetarian brand, if required) 8 sundried tomatoes 8 fresh basil leaves',
        accuracy: ''
    }
];

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
        this.setShowResult = this.setShowResult.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleTagsInput = this.handleTagsInput.bind(this);
        this.handleChangeTagsInput = this.handleChangeTagsInput.bind(this);
    }
    
    clearState() {
        this.setState({
            searchContent: [],
            searchContentInput: ''
        });
    }

    // Accessible for results view
    setShowResult(value) {
        this.setState({
            showResult: value
        });
    }

    search() {
        this.setState({
            showResult: true
        });
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
                <div className="tooltip">
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
                    <span className="tooltiptext">Press enter or semi-colon ( ; ) before clicking on search button</span>
                </div>

                <div className={classes.alignRight}>
                    <CustomButton variant="contained" 
                        onClick={this.search}
                        background={'green'}
                        className={classes.button}>
                        Search
                    </CustomButton>

                    <CustomButton variant="contained" 
                        className={classes.button + ' ' + classes.clearButton}
                        onClick={this.clearState}
                        background={null}>
                        Clear
                    </CustomButton>
                </div>
                
                {
                    showResult === true ?
                        <ResultsView 
                            {...other}
                            clearState={this.clearState}
                            setShowResult={this.setShowResult}
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