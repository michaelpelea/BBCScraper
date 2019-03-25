const styles = themes => ({    
    results: {
        marginTop: 16
    },
    buttonWrapper: {
        paddingTop: 8, 
        textAlign: 'center',
        "& button": {
            marginRight: 16
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
            width: 120,
            marginLeft: 8
        }
    },
    dialogHeader: {
        '& h2': {
            color: '#434343'
        }
    },
    agWrapper: {
        '& .ag-body-viewport .ag-row:hover': {
            cursor: 'pointer'
        }
    }
});

export default styles;