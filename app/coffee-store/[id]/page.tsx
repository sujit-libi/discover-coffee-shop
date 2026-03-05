import Upvote from '@/components/upvote.client';
import { createCoffeeStore, findRecordByFilter } from '@/lib/airtable';
import { fetchCoffeeStoreById, fetchCoffeeStores } from '@/lib/coffee-stores';
import { CoffeeStoreType, ServerParamsType } from '@/types';
import { getDomain } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

async function getData(id: string, type: string, queryId: string) {
  const coffeeStoreFromOSM = await fetchCoffeeStoreById(id, type, queryId);
  const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromOSM, id);

  const voting = _createCoffeeStore ? _createCoffeeStore[0].voting : 0;
  return coffeeStoreFromOSM
    ? {
        ...coffeeStoreFromOSM,
        voting,
      }
    : {};
}

export async function generateStaticParams() {
  const BHARATPUR = {
    latitude: '27.583331',
    longitude: '84.5166646',
  };
  const coffeeStores = await fetchCoffeeStores(
    BHARATPUR.latitude,
    BHARATPUR.longitude,
    6,
  );

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
    id: coffeeStore.id.toString(),
    type: coffeeStore.type,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: ServerParamsType) {
  const coffeeStore = await fetchCoffeeStoreById(
    params.id,
    searchParams.type,
    searchParams.queryId,
  );
  const { name = '' } = coffeeStore;
  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${params.id}`,
    },
  };
}

export default async function DynamicCoffeeStoreByIdPage(props: {
  params: { id: string };
  searchParams: { type: string; queryId: string };
}) {
  const {
    params: { id },
    searchParams: { type, queryId },
  } = props;

  const coffeeStoreById = await getData(id, type, queryId);

  const {
    name = '',
    address = {},
    imgUrl = '',
    display_name = '',
    voting = 0,
  } = coffeeStoreById;

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">Back to Home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name ?? display_name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={740}
            height={360}
            alt={name}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px]"
          />
        </div>
        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {display_name ??
            (address?.country && (
              <div className="mb-4 flex">
                <p className="pl-2">{address?.country}</p>
              </div>
            ))}
          <Upvote voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
