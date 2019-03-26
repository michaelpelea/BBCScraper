
const styles = theme => ({
    containerWrapper: {
        position: 'relative',
        zIndex: 250,
        height: '100%'
    },
    container: {
        position: 'relative',
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        paddingBottom: '5px'
    },
    background: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        height: '180px',
        width: '100%',
        '& > div:first-child': {
            height: 180,
            backgroundColor: 'rgb(250, 119, 69)',
            backgroundImage: 'linear-gradient(to right, rgb(250, 119, 69), rgb(243, 196, 66))'
        }
    }
});

export default styles;