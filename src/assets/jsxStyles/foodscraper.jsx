const styles = theme => ({
    card: {
        maxWidth: 1200,
        width: '100%',
        padding: '0 24px',
        marginTop: 10,
        height: '100%',
        marginBottom: 10
    },
    cardContent: {
        paddingTop: 0
    },  
    buttonWrapper: {
        paddingTop: '16px'
    },
    openGoogleButton: {
        width: '32%',
        marginLeft: '16px'
    },
    leftButtonHalfWidth: {
        width: '32%',
        marginRight: '16px',
        backgroundColor: '#fb8c00',
        color: '#ffffff'
    },
    rightButtonHalfWidth: {
        width: '32%'
    },
    header: {
        '& button': {
            width: '15%',
            height: '36px',
            marginTop: '24px'
        },
        '& > div': {
            display: 'inline-flex',
            width: '50%',
            '& b': {
                marginRight: '8px'
            }
        }
    },
    sheetId: {
        width: '100%'
    },
    websiteUrl: {
        width: 'calc(100% - 24px)'
    },
    content: {
        paddingTop: '8px'
    }
});

export default styles;