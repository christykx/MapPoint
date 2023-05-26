//new code
import { useState, useEffect, useRef } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState(null);
  const mapRef = useRef(null);

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props.name);
  };

  const onInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setManualLocation(value);
  };

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Update the map location when the manualLocation state changes
    if (manualLocation) {
      const [lat, lng] = manualLocation.split(',');
      setCurrentLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [manualLocation]);

  useEffect(() => {
    // Fit the map viewport to the current location bounds
    if (currentLocation && mapRef.current) {
      const bounds = new props.google.maps.LatLngBounds();
      bounds.extend(currentLocation);
      mapRef.current.map.fitBounds(bounds);
    }
  }, [currentLocation, props.google.maps.LatLngBounds]);

  // Check if currentLocation is null before rendering the map
  if (!currentLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <div>
        Latitude: {currentLocation.lat.toFixed(6)}
        <br />
        Longitude: {currentLocation.lng.toFixed(6)}
      </div>

      <input
        type="text"
        value={manualLocation || ''}
        onChange={handleLocationChange}
        placeholder="Enter latitude,longitude"
      />

      <Map
        google={props.google}
        zoom={14}
        initialCenter={currentLocation}
        ref={mapRef}
      >
        <Marker
          onClick={onMarkerClick}
          name={'Current location'}
          position={currentLocation}
        />

        <InfoWindow onClose={onInfoWindowClose}>
          {selectedPlace && (
            <div>
              <h1>{selectedPlace}</h1>
            </div>
          )}
        </InfoWindow>
      </Map>
    </div>
  );
};


  const Banner = () => {
    return (
      <div>
        <MapContainer
          google={window.google}
          apiKey="AIzaSyA3gLkRmq1HhgX8zBvqonlKvcpWlRV9s5A"
        />
      </div>
    );
  };

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyA3gLkRmq1HhgX8zBvqonlKvcpWlRV9s5A'
  })(Banner);

