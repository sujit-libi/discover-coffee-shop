'use client';

import useTrackLocation from '@/hooks/use-track-location';
import Banner from './banner.client';
import Card from './card.server';
import { CoffeeStoreType } from '@/types';
import { useEffect, useState } from 'react';
import { fetchCoffeeStores } from '@/lib/coffee-stores';

export default function NearByCoffeeStore() {
  const {
    handleTrackLocation,
    isFindingLocation,
    latitude,
    longitude,
    locationErrorMsg,
  } = useTrackLocation();
  function handleOnClick() {
    handleTrackLocation();
  }

  const [coffeeStores, setCoffeeStores] = useState([]);

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (latitude && longitude) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/coffee-store?lat=${latitude}&lng=${longitude}&limit=${limit}`,
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (error) {
          console.error(error);
        }
      }
    }
    coffeeStoresByLocation();
  }, [latitude, longitude]);

  // useTrackLocation
  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
      {coffeeStores.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Nearby Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((store: CoffeeStoreType) => (
              <Card
                key={store.id}
                name={store.name}
                imgUrl={store.imgUrl}
                type={store.type}
                href={`/coffee-store/${store.id}?type=${store.type}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
