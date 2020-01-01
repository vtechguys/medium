import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
    searching,
    updateDropOffLocation,
    updateMyCurrentLocation,
    updatePickUpLocation,
    updateMyLocationAndCurrentRegion,
    updateCurrentRegion,
    getRoute
} from '../redux/actions/mapscreenActions';
import { Polyline } from 'react-native-maps';
import Map from '../components/Map';
import MapMarker from '../components/MapMarker';

import { Icon, Container } from '../UI';


import FormPickUpDropOff from '../components/FormPickUpDropOff';


import { window, size } from '../constants/Layout';
let { width, height } = window;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
    container: {

        width, height
    },
    mapContainer: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width, height, },
    showMyCurrentLocation: {
        position: 'absolute',
        bottom: height / 4,
        right: width / 6,
        zIndex: 1050
    },
    navigateButtonStyle: {
        // position: 'absolute',
        // bottom: height / 4,
        // right: width / 6,
        zIndex: 500,
        transform: [{ rotateZ: '90deg'},{ translateY: -width * 0.2 },{ translateX: height * 0.20}]

    },
     headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

// console.log(width, height);
class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _mapMarginBottom: 1,
            _mapIsMapReady: false,
            focusedInputBoxId: '',
        };
        this._onMapReady = this._onMapReady.bind(this);
        this._focusOnMyLocation = this._focusOnMyLocation.bind(this);
        this._mapPanDragHandler = this._mapPanDragHandler.bind(this);
        this._mapRegionChangeHandler = this._mapRegionChangeHandler.bind(this);
        this.onChangeTextLocation = this.onChangeTextLocation.bind(this);
        this.onInputBoxFocus = this.onInputBoxFocus.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
        this._onNavigatonPress = this._onNavigatonPress.bind(this);
    }
    _onNavigatonPress(){
        this.props.getRoute();
        const { pickUpLocation } = this.props.mapScreen;
        this.props.updateCurrentRegion(pickUpLocation);
    }
    onInputBoxFocus(focusedInputBoxId) {
        this.setState({
            focusedInputBoxId
        });
    }
    _onMapReady() {
        this.setState({
            _mapMarginBottom: 10,
            _mapIsMapReady: true
        });
    }
    _focusOnMyLocation() {
        console.log(this.watchID);
        const { myLocation } = this.props.mapScreen;
        this.props.updateMyCurrentLocation(myLocation);
    }
    _geoLocationFindAndWatch() {
        const GEOLOCATION_CONFIG = {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 1000
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const myCurrentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                this.props.updateMyLocationAndCurrentRegion(myCurrentLocation);
            },
            (error) => {
                console.log(error);
            },
            GEOLOCATION_CONFIG,
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const myCurrentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            this.props.updateMyCurrentLocation(myCurrentLocation);

        }, error => {
            console.log(error)
        });
    }
    updateIfDiffIsSignificant(prevCoordinates, currentCoordinates) {
        const latitudeAbs = Math.abs(prevCoordinates.latitude - currentCoordinates.latitude);
        const isDiffLat = latitudeAbs > LATITUDE_DELTA * 2.5;
        const longitudeAbs = Math.abs(prevCoordinates.longitude - currentCoordinates.longitude);
        const isDiffLong = longitudeAbs > LONGITUDE_DELTA * 2.5;
        return isDiffLat || isDiffLong;
    }
    _mapPanDragHandler(event) {
        const { currentRegion } = this.props.mapScreen;
        const coordinate = event.nativeEvent.coordinate;
        const newCurrentRegion = {};
        newCurrentRegion.latitude = coordinate.latitude;
        newCurrentRegion.longitude = coordinate.longitude;
        if (this.updateIfDiffIsSignificant(currentRegion, newCurrentRegion)) {
            if (this.state.focusedInputBoxId === 'pickUp') {
                this.props.updatePickUpLocation(newCurrentRegion);
            }
            else if (this.state.focusedInputBoxId === 'dropOff') {
                this.props.updateDropOffLocation(newCurrentRegion);
            }
            else {
                this.props.updateCurrentRegion(newCurrentRegion);
            }
        }
    }
    componentDidMount() {
        this._geoLocationFindAndWatch();
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    _mapRegionChangeHandler(coordinate) {
        const { currentRegion } = this.props.mapScreen;
        const newCurrentRegion = {};
        newCurrentRegion.latitude = coordinate.latitude;
        newCurrentRegion.longitude = coordinate.longitude;
        if (this.updateIfDiffIsSignificant(currentRegion, newCurrentRegion)) {
            if (this.state.focusedInputBoxId === 'pickUp') {
                this.props.updatePickUpLocation(newCurrentRegion);
            }
            else if (this.state.focusedInputBoxId === 'dropOff') {
                this.props.updateDropOffLocation(newCurrentRegion);
            }
            else {
                this.props.updateCurrentRegion(newCurrentRegion);
            }
        }
    }
    _mapRegionChangeCompleteHandler() {
    }
    onChangeTextLocation(text) {
        if (text && text.trim().length > 3) {
            this.props.searching(text);
        }
    }
    onLocationSelect(selectedItemId) {
        const { searchResults } = this.props.mapScreen;
        let locationSelected = searchResults.filter(item => item.id == selectedItemId)[0];
        locationSelected = { ...locationSelected, ...locationSelected.coordinates };
        if (this.state.focusedInputBoxId === 'pickUp') {

            this.props.updatePickUpLocation(locationSelected);
        }
        else if (this.state.focusedInputBoxId === 'dropOff') {
            this.props.updateDropOffLocation(locationSelected);
        }
        this.setState({
            focusedInputBoxId: ''
        });
    }
    render() {
        const {
            myLocation,
            pickUpLocation,
            dropOffLocation,
            currentRegion,
            searchResults,
            routeInfo
        } = this.props.mapScreen;
        var fitAllMarkers = false;
        if(pickUpLocation && dropOffLocation){
            fitAllMarkers = true;
        }
        var regionIs = currentRegion;
        // if(pickUpLocation && dropOffLocation){
        //     regionIs = [pickUpLocation, dropOffLocation];
        // }
        // console.log(this.props.mapScreen);
        return (
            <View style={styles.container}>
                <Map
                    // value props
                    mapIsMapReady={this.state._mapIsMapReady}
                    mapMarginBottom={this.state._mapMarginBottom}

                    mapInitialRegion={myLocation}
                    mapMyCurrentLocation={true}
                    mapCurrentRegion={currentRegion}

                    mapZoomEnabled={true}
                    mapRotateEnabled={true}
                    // fitAllMarkers={regionIs}
                    //functional props
                    // mapRegionChangeHandler={this._mapRegionChangeHandler}
                    mapRegionChangeHandler={() => { }}

                    mapRegionChangeCompleteHandler={this._mapRegionChangeCompleteHandler}
                    mapPanDragHandler={this._mapPanDragHandler}
                    // mapPanDragHandler={()=>{}}
                    // fitToCoordinates={{coordinates: regionIs}}
                    mapReadyHandler={this._onMapReady}
                >
                    {
                        pickUpLocation
                            ?
                            <MapMarker
                                markerType='location'
                                markerTypeCategory='pickUp'
                                markerCoordinate={pickUpLocation} />
                            :
                            null

                    }

                    {
                        dropOffLocation ?
                            <MapMarker
                                markerType='location'
                                markerTypeCategory='dropOff'
                                markerCoordinate={dropOffLocation} />
                            : null
                    }
                    {       routeInfo ?
                        	<Polyline
                            coordinates={routeInfo.pathMapPolyLineCoordinates}
                            strokeColor="#d59563" // fallback for when `strokeColors` is not supported by the map-provider
                            // strokeColors={[
                            //     '#7F0000',
                            //     '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            //     '#B24112',
                            //     '#E5845C',
                            //     '#238C23',
                            //     '#7F0000'
                            // ]}
                            strokeWidth={6}
                        />
                        :null
                    }


                </Map>
                    
                <Icon
                            name='locate'
                            onPress={this._focusOnMyLocation}
                            style={styles.showMyCurrentLocation}
                            size={size.s1}
                        />
                <FormPickUpDropOff
                    focusedInputBoxId={this.state.focusedInputBoxId}
                    searchResults={searchResults}

                    onInputBoxFocus={this.onInputBoxFocus}
                    onLocationSelect={this.onLocationSelect}
                    onChangeText={this.onChangeTextLocation}
                >
                    {
                        pickUpLocation && dropOffLocation 
                        ?
                        <Icon
                        name='navigate'
                        onPress={this._onNavigatonPress}
                        style={styles.navigateButtonStyle}
                        size={size.s1 + 10}
                    />
                    : null
                    }


                </FormPickUpDropOff>

            </View>
        );
    }

}
function HeaderTitle(props){
    return <Container  center>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold' }}>Ride </Text>
        <Icon size={size.s2 + 4} name='car' color='green' />
    </Container>
}
MapScreen.navigationOptions = {
    title: 'Ride Car',
    // header: null,
    headerTitle: <HeaderTitle/>
};

const mapStateToProps = state => ({
    mapScreen: state.mapScreen
});

const mapDispatchToProps = {
    searching,
    updateMyCurrentLocation,
    updatePickUpLocation,
    updateDropOffLocation,
    updateMyLocationAndCurrentRegion,
    updateCurrentRegion,
    getRoute
};
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
