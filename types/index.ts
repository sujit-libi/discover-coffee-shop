export type CoffeeStoreType = {
  id: string;
  name: string;
  imgUrl: string;
  address: {
    county: string;
    road: string;
    state: string;
    country: string;
    city: string;
  };
  type: string;
  voting: number;
};

export type CoffeeStoreByIdType = {
  name: string;
  place_id: string;
  osm_id: string;
  display_name: string;
  address: {
    county: string;
    road: string;
    state: string;
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

export type AirtableRecordType = {
  id: string;
  recordId: string;
  fields: CoffeeStoreType;
};

export type ServerParamsType = {
  params: { id: string };
  searchParams: { type: string; queryId: string };
};
