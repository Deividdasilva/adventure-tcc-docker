import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../App";
import "./MapPage.css";

export interface MapPageProps {}

const MapPage = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [searchBoxA, setSearchBoxA] =
    React.useState<google.maps.places.SearchBox>();
  const [searchBoxB, setSearchBoxB] =
    React.useState<google.maps.places.SearchBox>();
  const [pointA, setPointA] = React.useState<google.maps.LatLngLiteral>();
  const [pointB, setPointB] = React.useState<google.maps.LatLngLiteral>();

  const [origin, setOrigin] = React.useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [destination, setDestination] =
    React.useState<google.maps.LatLngLiteral | null>(null);

  const [response, setResponse] =
    React.useState<google.maps.DistanceMatrixResponse | null>(null);

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onLoadA = (ref: google.maps.places.SearchBox) => {
    setSearchBoxA(ref);
  };

  const onLoadB = (ref: google.maps.places.SearchBox) => {
    setSearchBoxB(ref);
  };

  const onPlacesChangedA = () => {
    const places = searchBoxA!.getPlaces();
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    localStorage.setItem('latitude', String(location.lat));
    localStorage.setItem('longitude', String(location.lng));
    
    setPointA(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };


  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: "DRIVING",
      };
    }, [origin, destination]);

  const directionsCallback = React.useCallback((res:any) => {
    if (res !== null) {
      setResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <div className="address">
            <StandaloneSearchBox
              onLoad={onLoadA}
              onPlacesChanged={onPlacesChangedA}
            >
              <input
                className="addressField"
                placeholder="Digite o endereço do evento"
              />
            </StandaloneSearchBox>
          
          </div>
          {!response && pointA && <Marker position={pointA} />}

          {origin && destination && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {response && directionsRendererOptions && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
