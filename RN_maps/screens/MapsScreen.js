// import React from 'react';
// import { StyleSheet, View, Dimensions, FlatList, ScrollView } from 'react-native';

// import { connect } from 'react-redux';
// import {
//     searching,
//     updateDropOffLocation,
//     updateMyLocation,
//     updatePickUpLocation,
//     setPickUpLocationAsCurrentLocation,
//     emptySearchResults,
//     updateCurrentRegion
// } from '../redux/actions/mapscreenActions';

// import Map from '../components/Map';
// import MapMarker from '../components/MapMarker';

// import { Icon, Input, Item } from '../UI';

// let { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     showMyCurrentLocation: {
//         position: 'absolute',
//         bottom: 40,
//         right: 50,
//     },
//     locationPickAndDropSearch: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         top: 0,
//         marginTop: 50,
//         width: width
//     },


//     input: {
//         borderBottomWidth: 1,
//         borderBottomColor: 'orange',
//         width: 0.7 * width,
//     },
//     inputContainer: {},
//     // inputContainer:{
//     //    zIndex: 500,
//     //    flexDirection: 'column',
//     //    alignItems: 'center',
//     //    justifyContent: 'center'
//     // },
//     focusedInputStyle: {
//         ...StyleSheet.absoluteFill,
//         paddingTop: 30,
//         top: -50,

//         backgroundColor: 'white',
//         color: 'black',
//         flex: 1,
//         height: height,
//         width: width,
//                zIndex: 500,
//        alignItems: 'center',
//        justifyContent: 'center'
//     }

// });


// class MapScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             mapMarginBottom: 1,
//             mapIsMapReady: false,
//             focusedInput: '',

//         };
//         this._onMapReady = this._onMapReady.bind(this);
//         this._focusOnMyLocation = this._focusOnMyLocation.bind(this);
//         this._mapPanDragHandler = this._mapPanDragHandler.bind(this);
//         this._mapRegionChangeHandler = this._mapRegionChangeHandler.bind(this);
//         this.onChangeTextLocation = this.onChangeTextLocation.bind(this);

//     }
//     onInputFocus=(inputId)=>{
//         this.setState({
//             focusedInput: inputId
//         });
//     }
//     _onMapReady() {
//         this.setState({
//             mapMarginBottom: 10,
//             mapIsMapReady: true
//         });
//     }
//     _focusOnMyLocation() {
//         const { myLocation } = this.props.mapScreen;
//         // this.props.updatePickUpLocation(myLocation);
//         this.props.updateCurrentRegion(myLocation);

//     }
//     _geoLocationFindAndWatch() {
//         const GEOLOCATION_CONFIG = {
//             enableHighAccuracy: true,
//             timeout: 20000,
//             maximumAge: 1000
//         };
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const myCurrentLocation = {
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 };
//                 this.props.setPickUpLocationAsCurrentLocation(myCurrentLocation);
//             },
//             (error) => {
//                 console.log(error);
//             },
//             GEOLOCATION_CONFIG,
//         );
//         this.watchID = navigator.geolocation.watchPosition((position) => {
//             const myCurrentLocation = {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             };
//             this.props.updateMyLocation(myCurrentLocation);

//         });
//     }
//     updateIfDiffIsSignificant(prevCoordinates, currentCoordinates) {
//         const latitudeAbs = Math.abs(prevCoordinates.latitude - currentCoordinates.latitude);
//         const isDiffLat = latitudeAbs > LATITUDE_DELTA * 2.5;
//         const longitudeAbs = Math.abs(prevCoordinates.longitude - currentCoordinates.longitude);
//         const isDiffLong = longitudeAbs > LONGITUDE_DELTA * 2.5;
//         return isDiffLat || isDiffLong;
//     }
//     _mapPanDragHandler(event) {
//         const { pickUpLocation, } = this.props.mapScreen;
//         const coordinate = event.nativeEvent.coordinate;
//         const currentRegion = pickUpLocation;
//         const validRegion = {};
//         validRegion.latitude = coordinate.latitude;
//         validRegion.longitude = coordinate.longitude;
//         if (this.updateIfDiffIsSignificant(currentRegion, validRegion)) {
//             this.props.updateCurrentRegion(validRegion);
//         }
//     }
//     componentDidMount() {
//         this._geoLocationFindAndWatch();
//     }
//     componentWillUnmount() {
//         navigator.geolocation.clearWatch(this.watchID);
//     }
//     _mapRegionChangeHandler(coordinate) {
//         const { pickUpLocation } = this.props.mapScreen;
//         const currentRegion = pickUpLocation;
//         const validRegion = {};
//         validRegion.latitude = coordinate.latitude;
//         validRegion.longitude = coordinate.longitude;
//         if (this.updateIfDiffIsSignificant(currentRegion, validRegion)) {
//             this.props.updateCurrentRegion(validRegion);
//         }
//     }
//     _mapRegionChangeCompleteHandler() {
//     }
//     onChangeTextLocation(text) {
//         if (text && text.trim().length > 5) {
//             this.props.searching(text);
//         }
//         else if(text && text.trim().length < 5 && text.trim().length > 0){
//             this.props.emptySearchResults();
//         }
//     }
//     onLocationSelect=(id)=>{
       
//         const { searchResults } = this.props.mapScreen;
//         const locationSelected = searchResults.filter(item=>item.id==id)[0];
//         // console.log('selected\n',locationSelected);
//         if(this.state.focusedInput === 'pickUp'){
            
//             this.props.updatePickUpLocation(locationSelected.coordinates);
//         }
//         else if(this.state.focusedInput === 'dropOff'){
            
//             this.props.updateDropOffLocation(locationSelected.coordinates);
//         }
//         this.props.emptySearchResults();
//         this.setState({
//             focusedInput: ''
//         });
//     }
//     onChangeTextDropOffLocation(text) { }
//     render() {
//         var focusedPickUpInputStyle = null;
//         if(this.state.focusedInput === 'pickUp'){
//             focusedPickUpInputStyle = {...styles.inputContainer, ...styles.focusedInputStyle};
//         }
//         var inputDropOffBoxStyle = null;
//         if(this.state.focusedInput === 'dropOff'){
//             inputDropOffBoxStyle = {...styles.inputContainer, ...styles.focusedInputStyle, zIndex: 1000};
//         }
//         const { myLocation, pickUpLocation, searchResults, dropOffLocation,  currentRegion } = this.props.mapScreen;
//         // console.log(pickUpLocation);
//         return (
//             <View style={styles.container}>
//                 <Map
//                     // value props
//                     mapIsMapReady={this.state.mapIsMapReady}

//                     mapInitialRegion={myLocation}

//                     mapMarginBottom={this.state.mapMarginBottom}
//                     mapMyCurrentLocation={true}

//                     mapCurrentRegion={currentRegion}

//                     mapZoomEnabled={true}
//                     mapRotateEnabled={true}
//                     //functional props
//                     // mapRegionChangeHandler={this._mapRegionChangeHandler}
//                     mapRegionChangeHandler={()=>{}}

//                     mapRegionChangeCompleteHandler={this._mapRegionChangeCompleteHandler}
//                     mapPanDragHandler={this._mapPanDragHandler}
//                     // mapPanDragHandler={()=>{}}

//                     mapReadyHandler={this._onMapReady}
//                 >
//                     <MapMarker
//                         markerType='location'
//                         markerTypeCategory='pickUp'
//                         markerCoordinate={pickUpLocation} />
//                     {
//                         dropOffLocation ?
//                         <MapMarker
//                         markerType='location'
//                         markerTypeCategory='dropOff'
//                         markerCoordinate={dropOffLocation} />
//                         : null
//                     }

//                 </Map>
//                 <Icon
//                     name='locate'
//                     onPress={this._focusOnMyLocation}
//                     style={styles.showMyCurrentLocation}
//                 />
//                 <View style={styles.locationPickAndDropSearch}>
//                     <View style={[styles.inputContainer, focusedPickUpInputStyle ]}>
//                         <Input
//                             onChangeText={this.onChangeTextLocation}
//                             placeholder='Pick up'
//                             style={styles.input}
//                             onFocus = {()=>this.onInputFocus('pickUp')}
//                         />
//                         <FlatList
//                             data={searchResults}
//                             renderItem={({ item }) => {
                                
//                                 const title = `${item.street} ${item.city} , ${item.state}, ${item.country}`;
//                                 return <Item
//                                     id={item.id}
//                                     title={title}
//                                     onSelect={()=>this.onLocationSelect(item.id)}
//                                 />
//                             }}
//                             keyExtractor={item => item.id}
//                         />
//                     </View>
//                     <View style={[styles.inputContainer, inputDropOffBoxStyle ]}>
//                         <Input
//                             onChangeText={this.onChangeTextLocation}
//                             placeholder='Drop Off'
//                             style={styles.input}
//                             onFocus = {()=>this.onInputFocus('dropOff')}
//                         />
//                         <FlatList
//                             data={searchResults}
//                             renderItem={({ item }) => {
                                
//                                 const title = `${item.street} ${item.city} , ${item.state}, ${item.country}`;
//                                 return <Item
//                                     id={item.id}
//                                     title={title}
//                                     onSelect={()=>this.onLocationSelect(item.id)}
//                                 />
//                             }}
//                             keyExtractor={item => item.id}
//                         />
//                     </View>
//                 </View>

//             </View>
//         );
//     }

// }
// MapScreen.navigationOptions = {
//     title: 'Maps'
// };

// const mapStateToProps = state => ({
//     mapScreen: state.mapScreen
// });

// const mapDispatchToProps = {
//     searching,
//     updateMyLocation,
//     updatePickUpLocation,
//     updateDropOffLocation,
//     setPickUpLocationAsCurrentLocation,
//     emptySearchResults,
//     updateCurrentRegion
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
