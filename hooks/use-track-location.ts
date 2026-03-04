'use client';

import { useState } from 'react';

type PositionType = {
  coords: { latitude: number; longitude: number };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  function success(position: PositionType) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLatitude(lat.toString());
    setLongitude(lng.toString());
    setIsFindingLocation(false);
    setLocationErrorMsg('');

    console.log(`Latitude: ${lat} °, Longitude: ${lng} °`);
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMsg('Unable to retrieve your location');
    console.error('Unable to retrieve your location');
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      console.error('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      setIsFindingLocation(true);
      setLocationErrorMsg('');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latitude,
    longitude,
    locationErrorMsg,
    isFindingLocation,
    handleTrackLocation,
  };
};

export default useTrackLocation;
