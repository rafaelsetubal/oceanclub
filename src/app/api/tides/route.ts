import { NextRequest, NextResponse } from 'next/server';
import { getIlheusTideData } from '@/lib/tides';

export const dynamic = 'force-dynamic';
export const revalidate = 1800; // 30 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date') || undefined;

    const data = await getIlheusTideData(dateParam);

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching tides API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Falha ao consultar tábua de marés',
      },
      { status: 500 }
    );
  }
}
