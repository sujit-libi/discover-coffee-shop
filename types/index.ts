export type CoffeeStoreType = {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
  type: string;
};

export type CoffeeStoreByIdType = {
  name: string;
  place_id: string;
  osm_id: string;
  display_name: string;
  address: {
    county: string;
    road: string;
    country: string;
    city: string;
  };
};

export type PhotonType = {
  osm_id: string;
  name: string;
  street: string;
  country: string;
  osm_type: string;
};
