import { CoffeeStoreByIdType, PhotonType } from '@/types';

const photonApi =
  'https://photon.komoot.io/api/?q=coffee&limit=6&lat=27.662098700131523&lon=85.4287697742991';

const defaultImgUrl =
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

const transformCoffeeData = (result: PhotonType) => {
  return {
    id: result.osm_id,
    address: result?.street || result?.country,
    name: result.name,
    type: result.osm_type,
    imgUrl: defaultImgUrl,
  };
};

const transformCoffeeStoreByIdData = (result: CoffeeStoreByIdType) => {
  return {
    ...result,
    imgUrl: defaultImgUrl,
  };
};

export async function fetchCoffeeStores() {
  try {
    const response = await fetch(photonApi);
    const data = await response.json();
    return data.features.map(({ properties }: { properties: PhotonType }) =>
      transformCoffeeData(properties),
    );
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
  }
}

export async function fetchCoffeeStoreById(id: string, type: string) {
  try {
    // const query = `[out:json];W(${id});out body;`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=${type}${id}&format=json`,
    );
    const data = await response.json();
    const coffeeStore = data.map((result: CoffeeStoreByIdType) =>
      transformCoffeeStoreByIdData(result),
    );

    return coffeeStore.length > 0 ? coffeeStore[0] : {};
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
  }
}
