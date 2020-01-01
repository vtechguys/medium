import React from 'react';
import MapView from 'react-native-maps';

function MarkerPickUpPoint(props) {
    return (
        <MapView.Marker
            coordinate={props.coordinate}
            title='Pick up point'
            image={require('../../assets/images/start.png')}
            draggble={false}
        />
    );
}
function MarkerDropOffPoint(props) {
    return (
        <MapView.Marker
            coordinate={props.coordinate}
            title='Drop off point'
            image={require('../../assets/images/end.png')}
            draggble={false}

        />
    );
}

function MarkerVehicle(props) {

    if(props.type === 'bike'){
        return (
            <MapView.Marker
                coordinate={props.coordinate}
                image={require('../../assets/images/bike.png')}
                draggble={false}

            />
        );
    }
    else if(props.type === 'auto'){
        return (
            <MapView.Marker
                coordinate={props.coordinate}
                image={require('../../assets/images/auto.png')}
                draggble={false}

            />
        );
    }

    return (
        <MapView.Marker
            coordinate={props.coordinate}
            image={require('../../assets/images/cab.png')}
            draggble={false}

        />
    );
}

function MarkerLocation(props){
    var markerLocation = null;
    if(props.type === 'dropOff'){
        markerLocation = (
            <MarkerDropOffPoint 
                coordinate = {props.coordinate}
            />
        );
    }
    else{
        markerLocation = (
            <MarkerPickUpPoint 
                coordinate = {props.coordinate}
            />
        );
    }
    return markerLocation;
}

export default function Marker(props){
    var markerJSX = null;
    if(props.markerType == 'vehicle'){
        markerJSX = (
            <MarkerVehicle 
                type = {props.markerTypeCategory}
                coordinate = {props.markerCoordinate}
            />
        );
    }
    else{
        markerJSX = (
            <MarkerLocation type = {props.markerTypeCategory} coordinate = {props.markerCoordinate}/>
        );
    }
    return markerJSX;
}