import {
    MAPS_SCREEN_SEARCH_ERROR,
    MAPS_SCREEN_SEARCH_LOADING,
    MAPS_SCREEN_SEARCH_SUCCESS,
    MAPS_SCREEN_UPDATE_DROP_OFF_POINT,
    MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION,
    MAPS_SCREEN_UPDATE_PICK_UP_POINT,
    MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION_AND_CURRENT_REGION,
    EMPTY_SEARCH_RESULTS_ARRAY,
    CURRENT_REGION_UPDATE,
    MAPS_SCREEN_SEARCH_STRING_UPDATE,
    MAP_SCREEN_GET_ROUTE,
    MAP_SCREEN_GET_ROUTE_SUCCESS,
    MAPS_SCREEN_CURRENT_REGION_UPDATE

} from '../actions/types'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const defaultLocation = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const initialState = {
    searchResults: [],

    isSearchLoading: false,
    errors: null,

    myLocation: defaultLocation,
    currentRegion: defaultLocation,

    pickUpLocation: null,
    dropOffLocation: null,

    searchString: '',
    routeInfo: null

};

import { Dimensions } from 'react-native';

function reduceUpdateCurrentRegion(state, payload){
    return {
        ...state, 
        currentRegion: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
    };
}
function reduceToggleSearchLoading(state) {
    return {
        ...state,
        isSearchLoading: !state.isSearchLoading
    };
}
function reduceSearchSuccess(state, payload) {
    return {
        ...state,
        searchResults: payload && payload.length > 0 ? payload : []
    };
}
function reduceSearchError(state, payload) {
    return {
        ...state,
        errors: {
            message: 'place not found'
        }
    };
}
function reduceUpdatePickUpLocation(state, payload) {
    return {
        ...state,
        pickUpLocation: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            info: payload.info,
            searchString: payload.searchString
        },
        searchResults: []
    };
}
function reduceUpdateDropOffLocation(state, payload) {
    return {
        ...state,
        dropOffLocation: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            info: payload.info,
            searchString: payload.searchString

        },
        searchResults: []
    };
}
function reduceUpdateMyCurrentLocation(state, payload) {
    return {
        ...state,
        myLocation: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },

    };
}
function reduceUpdateMyCurrentLocationAndCurrentRegion(state, payload) {
    return {
        ...state,
        myLocation: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        currentRegion: {
            latitude: payload.latitude,
            longitude: payload.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
    };
}
function emptySearchResultsArray(state) {
    return {
        ...state,
        searchResults: []
    };
}
export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case MAPS_SCREEN_SEARCH_LOADING:
            return reduceToggleSearchLoading(state, action.payload);
        case MAPS_SCREEN_SEARCH_SUCCESS:
            return reduceSearchSuccess(state, action.payload);
        case MAPS_SCREEN_SEARCH_ERROR:
            return reduceSearchError(state, action.payload);
        case MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION:
            return reduceUpdateMyCurrentLocation(state, action.payload);
        case MAPS_SCREEN_UPDATE_PICK_UP_POINT:
            return reduceUpdatePickUpLocation(state, action.payload);
        case MAPS_SCREEN_UPDATE_DROP_OFF_POINT:
            return reduceUpdateDropOffLocation(state, action.payload);
        case MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION_AND_CURRENT_REGION:
            return reduceUpdateMyCurrentLocationAndCurrentRegion(state, action.payload);
        case EMPTY_SEARCH_RESULTS_ARRAY:
            return emptySearchResultsArray(state);
        case CURRENT_REGION_UPDATE:
            return reduceUpdateCurrentRegion(state, action.payload);
        case MAPS_SCREEN_SEARCH_STRING_UPDATE:
            return {
                ...state,
                searchString: action.payload
            }

        case MAP_SCREEN_GET_ROUTE_SUCCESS: 
            // console.log(action);
            return {
                ...state,
                routeInfo: action.payload,
                pickUpLocation: null,
                
            }
        case MAPS_SCREEN_CURRENT_REGION_UPDATE:
            return {
                ...state,
                currentRegion:{
                    ...state.currentRegion,
                    ...action.payload
                }
            };
        default:
            return state
    }
}