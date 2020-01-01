import axios from 'axios'
import {
    API_URLS_BASE_URL,
    API_URLS_SEARCH_MAPS_GEOCOADING,
    MAPS_API_KEY
} from '../../config'
import {
    MAPS_SCREEN_SEARCH_ERROR,
    MAPS_SCREEN_SEARCH_LOADING,
    MAPS_SCREEN_SEARCH_SUCCESS,
    MAPS_SCREEN_UPDATE_DROP_OFF_POINT,
    MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION,
    MAPS_SCREEN_UPDATE_PICK_UP_POINT,
    MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION_AND_CURRENT_REGION,
    MAPS_SCREEN_SEARCH_STRING_UPDATE,
    MAPS_SCREEN_CURRENT_REGION_UPDATE, MAP_SCREEN_GET_ROUTE_SUCCESS
} from './types'

function dispatchSearchError(dispatch, errors = null) {
    const searchErrorDispatch = {
        type: MAPS_SCREEN_SEARCH_ERROR,
        errors
    };
    dispatch(searchErrorDispatch);
}
function dispatchToggleSearchLoading(dispatch) {
    const toggleSearchLoadingDispatch = {
        type: MAPS_SCREEN_SEARCH_LOADING
    };
    dispatch(toggleSearchLoadingDispatch);
}
function formatSearchResults(results) {
    const searchResponse = [];
    for (let i = 0; i < results.locations.length; i++) {
        const current = results.locations[i];
        const formatedResult = {
            id: current.linkId.split("/").join("-") + Math.floor(Math.random() * 10000),
            coordinates: {
                latitude: current.latLng.lat,
                longitude: current.latLng.lng
            },
            street: current.street,
            city: current.adminArea5,
            state: current.adminArea3,
            country: current.adminArea1,
            searchString: results.providedLocation.location,
            info: current
        };
        searchResponse.push(formatedResult);
    }
    return searchResponse;
}
function dispatchSearchSuccess(dispatch, payload) {
    const searchSuccessDispatch = {
        type: MAPS_SCREEN_SEARCH_SUCCESS,
        payload
    };
    dispatch(searchSuccessDispatch);
}
export function updateMyLocationAndCurrentRegion(coordinates) {
    const updateMyLocationAndCurrentRegionDispatch = {
        type: MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION_AND_CURRENT_REGION,
        payload: coordinates
    };
    return updateMyLocationAndCurrentRegionDispatch;

}
export function updateMyCurrentLocation(coordinates) {
    const updateMyLocationDispatch = {
        type: MAPS_SCREEN_UPDATE_MY_CURRENT_LOCATION,
        payload: coordinates
    };
    return updateMyLocationDispatch;

}
export function updateCurrentRegion(coordinates) {
    return {
        type: MAPS_SCREEN_CURRENT_REGION_UPDATE,
        payload: coordinates
    };
}

export function updatePickUpLocation(coordinates) {
    const updateMyLocationDispatch = {
        type: MAPS_SCREEN_UPDATE_PICK_UP_POINT,
        payload: coordinates
    };
    return (updateMyLocationDispatch);

}
export function updateDropOffLocation(coordinates) {
    const updateMyLocationDispatch = {
        type: MAPS_SCREEN_UPDATE_DROP_OFF_POINT,
        payload: coordinates
    };
    return (updateMyLocationDispatch);

}



function currentSearchKeyword(dispatch, searchString) {
    const currentSearchKeywordDispatch = {
        type: MAPS_SCREEN_SEARCH_STRING_UPDATE,
        payload: searchString
    };
    return dispatch(currentSearchKeywordDispatch);
}















export function searching(searchString) {


    return function dispatchSearching(dispatch, getState) {
        if (searchString && typeof searchString == 'string' && searchString.trim().length > 5) {
            dispatchToggleSearchLoading(dispatch);
            currentSearchKeyword(dispatch, searchString);
            // console.log('State \n',getState().mapScreen);
            const searchStringNow = getState().mapScreen.searchString;

            const postData = {
                key: MAPS_API_KEY,
                outFormat: 'json',
                location: searchString,
                maxResults: 5,
                thumbMaps: false
            };
            const location = searchString.split(" ").join("+");
            const URL = `${API_URLS_SEARCH_MAPS_GEOCOADING}?key=${MAPS_API_KEY}&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false&maxResults=5`;
            axios
                .get(URL)
                .then(function successApi(success) {
                    var response = success.data;
                    if (response) {
                        if (response.results[0] && response.results[0].providedLocation.location === searchStringNow) {
                            const locations = formatSearchResults(response.results[0]);
                            // console.log('\n_______\nlocations\n', locations, '\n\n');
                            dispatchSearchSuccess(dispatch, locations);
                        }
                        else {
                            dispatchSearchSuccess(dispatch, []);

                        }
                    }
                })
                .catch(function errorApi(e) {
                    console.log(e);
                    dispatch(dispatchSearchError(e));
                });

        }

    }
}
function dispatchGetRouteSuccess(dispatch, payload){
    const getRouteSuccessAction = {
        type: MAP_SCREEN_GET_ROUTE_SUCCESS,
        payload
    };
    return dispatch(getRouteSuccessAction);
}
export function getRoute() {
    return function dispatchGetRoute(disptach, getState) {
        // http://www.mapquestapi.com/directions/v2/route?key=2YprgtkcTtvFUH1bApz52EBxgS1lsPTG&from=sector 21 d,faridabad haryana, india&to=ambedkar hospital,+rohini+ delhi,+india
        const { pickUpLocation, dropOffLocation } = getState().mapScreen;
        /*
            {


	"locations":[
		{
          "street": "",
          "adminArea6": "",
          "adminArea6Type": "Neighborhood",
          "adminArea5": "Rohini",
          "adminArea5Type": "City",
          "adminArea4": "",
          "adminArea4Type": "County",
          "adminArea3": "Delhi",
          "adminArea3Type": "State",
          "adminArea1": "IN",
          "adminArea1Type": "Country",
          "postalCode": "",
          "geocodeQualityCode": "A5XAX",
          "geocodeQuality": "CITY",
          "dragPoint": false,
          "sideOfStreet": "N",
          "linkId": "IN/GEO/p0/53237",
          "unknownInput": "",
          "type": "s",
          "latLng": {
            "lat": 28.70187,
            "lng": 77.09836
          }
        },
        {
          "street": "Sector 21 Road",
          "adminArea6": "",
          "adminArea6Type": "Neighborhood",
          "adminArea5": "Faridabad",
          "adminArea5Type": "City",
          "adminArea4": "",
          "adminArea4Type": "County",
          "adminArea3": "Haryana",
          "adminArea3Type": "State",
          "adminArea1": "IN",
          "adminArea1Type": "Country",
          "postalCode": "121001, 121012",
          "geocodeQualityCode": "B3CAA",
          "geocodeQuality": "STREET",
          "dragPoint": false,
          "sideOfStreet": "N",
          "linkId": "IN/STR/p0/688604",
          "unknownInput": "",
          "type": "s",
          "latLng": {
            "lat": 28.41919,
            "lng": 77.29375
          }
        }	
	]


}
        
        */
        const postData = {
            locations: [
                pickUpLocation.info,
                dropOffLocation.info
            ]
        };
        axios.post('http://www.mapquestapi.com/directions/v2/route?key=2YprgtkcTtvFUH1bApz52EBxgS1lsPTG', postData)
            .then(success => {
                const response = success.data;
                const route = response.route;
                if (route && route.boundingBox && route.distance > 0 && route.legs && route.legs.length > 0) {
                    //correctly found some route
                    const { boundingBox, formattedTime, sessionId } = route;

                    const routeInfo = {
                        boundingBox, formattedTime, sessionId,

                    };
                    const narratives = [];
                    const legs = route.legs;
                    if (legs[0].maneuvers && legs[0].maneuvers.length > 0) {
                        const polylinePath = [];
                        const { maneuvers, origNarrative, destNarrative } = legs[0];
                        for (let i = 0; i < maneuvers.length; i++) {
                            const current = maneuvers[i];
                            const narrativeNavigation = {
                                distance: current.distance,
                                narrative: current.narrative,
                                turn: current.turnType,
                                coordinates: {
                                    latitude: current.startPoint.lat,
                                    longitude: current.startPoint.lng
                                },
                                icon: current.iconUrl,
                                direction: current.directionName
                            };
                            polylinePath.push(narrativeNavigation.coordinates);
                            narratives.push(narrativeNavigation);
                        }
                        routeInfo.origNarrative = origNarrative;
                        routeInfo.destNarrative = destNarrative
                        routeInfo.pathMapPolyLineCoordinates = polylinePath;

                    }
                    // console.log(routeInfo);

                    dispatchGetRouteSuccess(disptach, routeInfo);

                }
            })
            .catch(error => console.log(error));
    }
}

