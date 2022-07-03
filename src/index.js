import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  LoadScript,
} from "@react-google-maps/api";
export const REACT_APP_GOOGLE_API_KEY = "AIzaSyDICZ0YXfOVy5q8zd3pY1r9ntqLnr2RiZ8";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      ></LoadScript>
    <App />
  </React.StrictMode>
);

