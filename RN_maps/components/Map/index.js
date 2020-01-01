import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Spinner, WhiteBoard } from '../../UI';
const MAP_STYLE = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];
import { window } from '../../constants/Layout';
const { width, height } = window;
const styles = StyleSheet.create({
    mapLocalStyles: {
        flex: 1,
        width: width,
        height: height
    }
});



function Map(props) {
    let mapJSX = null;
    if (!props.mapInitialRegion) {
        mapJSX = (
            
            <Spinner />
        );
        return mapJSX;
    }
    mapJSX = (
        <MapView
            initialRegion={props.mapInitialRegion}
            provider={props.mapProvider || MapView.PROVIDER_GOOGLE}
            style={{
                ...styles.mapLocalStyles,
                marginBottom: props.mapMarginBottom || 1,
                // marginTop: 20
            }}
            showsUserLocation={props.mapMyCurrentLocation}
            region={props.mapCurrentRegion}
            customMapStyle={MAP_STYLE}
            onRegionChange={props.mapRegionChangeHandler}
            onRegionChangeComplete={props.mapRegionChangeCompleteHandler}
            // onMarkerDrag={props.mapMarkerDragHandler}
            // onPanDrag={props.mapPanDragHandler}
            showsMyLocationButton={ props.mapShowMyLocationButton || false}
            zoomEnabled={props.mapZoomEnabled}
            rotateEnabled={props.mapRotateEnabled}
            onMapReady={props.mapReadyHandler}
            // fitAllMarkers = {props.fitAllMarkers}
            fitToCoordinates={props.fitToCoordinates}
        >
          {
            // !props.mapIsMapReady 
            //   ? 
            //     // <WhiteBoard>
            //       <Spinner/>
            //     // </WhiteBoard> 
            //   : 
                props.children
          }

            

        </MapView>
    );
    return mapJSX;
}
export default Map;
