import Banner from '@/components/banner.client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const coffeeStoreId = 'dark-house-coffee';
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Banner />
        <Link href={`/coffee-store/${coffeeStoreId}`}>Dark House Coffee</Link>
      </main>
    </div>
  );
}
