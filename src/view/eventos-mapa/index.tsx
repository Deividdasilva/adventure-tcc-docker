import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../../App";
import "./eventos-mapa.css";
import { Link, useParams } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import EventoCard from '../../components/evento-card-map';
import Navbar from '../../components/navbar';
export interface EventosMapaProps {}

const EventosMapa = () => {
  const [eventos, setEventos] = useState([]);
  const [urlImagem, setUrlImagem] = useState();
  const [pesquisa, setPesquisa] = useState('');

  let currentId = useParams();
  const { id } = currentId;

  const usuarioEmail = ""
  const [map, setMap] = React.useState<google.maps.Map>();
  const [searchBoxA, setSearchBoxA] =
    React.useState<google.maps.places.SearchBox>();
  const [searchBoxB, setSearchBoxB] =
    React.useState<google.maps.places.SearchBox>();
  const [pointA, setPointA] = React.useState<google.maps.LatLngLiteral>();

  const [selectedPoint, setselectedPoint] = useState(null);

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

  const [ selected, setSelected ] = useState({});
    
  useEffect(() => {
      firebase.firestore().collection('eventos').get().then(async (resultado) => {
        const listaeventos : any  = [];
        await resultado.docs.forEach(doc => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0 ) {
            listaeventos.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        setEventos(listaeventos);
      })
    }
  , []);


  const onPlacesChangedA = () => {
    const places = searchBoxA!.getPlaces();
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    
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
    <>
    <Navbar />
    <div className="mapEventos">
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={5}
        >
          {eventos.map(item =>
            <Marker 
              title={item['detalhes']} 
              position={new window.google.maps.LatLng(item['latitude'],item['longitude'])}
              onClick={() => {
                setselectedPoint(item);
             }}>
               {selectedPoint && selectedPoint['id'] === item['id'] && (
           <InfoWindow onCloseClick={() => setselectedPoint(null)}
           >
             <div>
               <EventoCard key={item['id']} id={item['id']} img={item['imagem']} titulo={item['titulo']} detalhes={item['detalhes']} data={item['data']} hora={item['hora']}  />
             </div>
           </InfoWindow>
         )}
            </Marker>
            )}
         

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
    </>
    
  );
};

export default EventosMapa;
