import { CoffeeStoreByIdType, PhotonType } from '@/types';

const photonApi =
  'https://photon.komoot.io/api/?q=coffee&limit=6&lat=27.662098700131523&lon=85.4287697742991';

const defaultImgUrl =
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10`,
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: any }) => result.urls['small']);
  } catch (error) {
    console.error('Error retrieving a photo', error);
  }
};

const transformCoffeeData = (
  idx: number,
  result: PhotonType,
  photos: Array<string>,
) => {
  return {
    id: result.osm_id,
    address: result?.street || result?.country,
    name: result.name,
    type: result.osm_type,
    imgUrl: photos.length > 0 ? photos[idx] : defaultImgUrl,
  };
};

const transformCoffeeStoreByIdData = (
  idx: number,
  result: CoffeeStoreByIdType,
  photos: Array<string>,
) => {
  return {
    ...result,
    imgUrl: photos.length > 0 ? photos[idx] : defaultImgUrl,
  };
};

export async function fetchCoffeeStores(
  latitude: string,
  longitude: string,
  limit: number,
) {
  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=coffee&limit=${limit}&lat=${latitude}&lon=${longitude}`,
    );
    const photos = await getListOfCoffeeStorePhotos();
    const data = await response.json();
    return (
      data?.features?.map(
        ({ properties }: { properties: PhotonType }, idx: number) =>
          transformCoffeeData(idx, properties, photos),
      ) || []
    );
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
    return [];
  }
}

export async function fetchCoffeeStoreById(
  id: string,
  type: string,
  queryId: string,
) {
  try {
    // const query = `[out:json];W(${id});out body;`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=${type}${id}&format=json`,
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    const coffeeStore =
      data?.map((result: CoffeeStoreByIdType, idx: number) =>
        // transformCoffeeStoreByIdData(parseInt(queryId), result, photos),
        transformCoffeeStoreByIdData(idx, result, photos),
      ) || [];

    return coffeeStore.length > 0 ? coffeeStore[0] : {};
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
    return {};
  }
}
