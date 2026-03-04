import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('lat') || '';
    const longitude = searchParams.get('lng') || '';
    const limit = searchParams.get('limit') || '';
    if (longitude && latitude) {
      const response = await fetchCoffeeStores(
        latitude,
        longitude,
        parseInt(limit),
      );
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Something went wrong', error);
    return NextResponse.json(`Something went wrong!!!! Error: ${error}`, {
      status: 500,
    });
  }
}
