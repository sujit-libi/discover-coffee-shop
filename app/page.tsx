import Banner from '@/components/banner.client';
import Card from '@/components/card.server';
import NearByCoffeeStore from '@/components/nearby-coffee-store.client';
import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { CoffeeStoreType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

async function getData() {
  const BHARATPUR = {
    latitude: '27.583331',
    longitude: '84.5166646',
  };
  return await fetchCoffeeStores(BHARATPUR.latitude, BHARATPUR.longitude, 6);
}

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearByCoffeeStore />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Chitwan Stores
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
      </main>
    </div>
  );
}
