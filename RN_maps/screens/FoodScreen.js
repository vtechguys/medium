import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { window } from '../constants/Layout';
const { width, height } = window;
import { Container, Spinner } from "../UI";
import { API_URLS_ORDER_FOOD_URL } from '../config';
import { WebView } from 'react-native-webview';

export default class FoodScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.setIsLoading = this.setIsLoading.bind(this);
    }
    setIsLoading() {
        this.setState({
            isLoading: false
        });
    }
    render() {
        const { isLoading } = this.state;
        var style = styles.hide;
        if(!isLoading){
            style = styles.raiseAbsolute;
        }
        return (
            <Container center column>
                {
                    isLoading
                        ?
                        (
                            <Container>
                                <Spinner />
                            </Container>
                        )
                        :
                        null
                }
                <WebView
                    source={{
                        uri: API_URLS_ORDER_FOOD_URL
                    }}
                    style={[style, styles.WebViewStyle]}
                    onLoadEnd={this.setIsLoading}
                />
            </Container>
        );
    }
}
function HeaderTitle(props){
    return <View style={styles.headerTitleContainer}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold' }}>Uber </Text>
        <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold' }}>Eats</Text>
    </View>
}
FoodScreen.navigationOptions = {
    // header: null,
    title: 'Uber Eats',
    headerTitle: <HeaderTitle/>
};

const styles = StyleSheet.create({
    raiseAbsolute: {
        // ...StyleSheet.absoluteFill,
        // zIndex: 100,
        // width: window.width,
        // height: window.width
    },
    hide: {
        width: 0,
        height: 0,
        display: 'none'
    },
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: height * 0.01,
        width: window.width,
        height: window.height
    },
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // headerTitleLeftText: {

    // }
});