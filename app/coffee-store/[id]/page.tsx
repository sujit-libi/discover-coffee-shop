import { fetchCoffeeStoreById, fetchCoffeeStores } from '@/lib/coffee-stores';
import { CoffeeStoreType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

async function getData(id: string, type: string, queryId: string) {
  return await fetchCoffeeStoreById(id, type, queryId);
}

// export async function generateStaticParams() {
//   const coffeeStores = await fetchCoffeeStores();

//   return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
//     id: coffeeStore.id.toString(),
//     type: coffeeStore.type,
//   }));
// }

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
        </div>
      </div>
    </div>
  );
}
