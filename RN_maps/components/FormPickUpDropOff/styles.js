import { StyleSheet } from 'react-native';
import { window } from '../../constants/Layout';
const { width, height } = window;
const styles = StyleSheet.create({
    topFloat: {
        ...StyleSheet.absoluteFill,
        top: 0,
        width: width,
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center' ,
        height: height * 0.20,
        
    },
    container:{
        height: height * 0.20,
        paddingTop: height * 0.05
    },
    containerExpand: {
        flex: 1,
        width, height
    },
    containerOnFocusedInput:{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'white',
        color: 'black',
        flex: 1,
        height: height,
        width: width,
        // zIndex: 100,
    },
    hide: {
        display: "none"
    },

    defaultInput: {
        width: 0.7 * width
    },
    input: {
        // flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        width: 0.7 * width
    },
    focusedInputStyle: {
        ...StyleSheet.absoluteFill,
        paddingTop: 30,
        // top: 20,
        // left: 0,
        backgroundColor: 'white',
        color: 'black',
        flex: 1,
        height: height,
        width: width,
        zIndex: 2000,
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'center' ,
    },
    submitButton: {
        justifyContent: 'flex-end'
    }

});
export default styles;