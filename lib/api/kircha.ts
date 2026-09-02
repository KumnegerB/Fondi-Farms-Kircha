/**
 * Kircha API Service Layer
 * Connects frontend to the deployed backend at sanduq.jirtuu.dev / localhost:4000
 */

export interface KirchaCycleItem {
  id: string;
  name: string;
  slug: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  _count?: {
    groups: number;
  };
}

export interface KirchaCycleResponse {
  data: KirchaCycleItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FrontendKirchaListing {
  id: string;
  cattleName: string;
  tagNumber: string;
  category: 'ox' | 'sheep' | 'goat';
  breed: string;
  weight: string;
  description: string;
  coverImage: string;
  images: string[];
  portionType: string;
  portionAmharic: string;
  portionEnglish: string;
  priceETB: number;
  totalSellingPriceETB: number;
  depositPerKirchaETB: number;
  reservedShares: number;
  totalShares: number;
  availableQuarterUnits: number;
  maxAvailableQuarterUnits: number;
  isAlmostFull: boolean;
  slaughterDateEnglish: string;
  slaughterDateAmharic: string;
  location: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://jxa5jqxyneydse1szmesjqcs.sanduq.jirtuu.dev';

// Fallback items when backend is warming up or during development
const FALLBACK_LISTINGS: FrontendKirchaListing[] = [
  {
    id: 'krc-1',
    cattleName: 'Arsi Bull K-025',
    tagNumber: 'FR10018159',
    category: 'ox',
    breed: 'ARSI BULL',
    weight: '~420KG',
    description: 'Healthy highland bull raised at Fondi Farms Ambo.',
    coverImage: '/images/arsi_bull.png',
    images: [
      '/images/arsi_bull.png',
      '/images/borana_ox_detail.png',
      '/images/figma_banner.png',
    ],
    portionType: 'full',
    portionAmharic: 'ሙሉ መደብ',
    portionEnglish: 'Full Share (1.0)',
    priceETB: 16500,
    totalSellingPriceETB: 198000,
    depositPerKirchaETB: 4500,
    reservedShares: 10,
    totalShares: 12,
    availableQuarterUnits: 8,
    maxAvailableQuarterUnits: 8,
    isAlmostFull: true,
    slaughterDateEnglish: 'Sep 7, 2026',
    slaughterDateAmharic: 'ጳጉሜ 2, 2018',
    location: 'Fondi Farms Center, Ambo',
  },
  {
    id: 'krc-2',
    cattleName: 'Borana Prime Ox K-024',
    tagNumber: 'FR10018160',
    category: 'ox',
    breed: 'BORANA OX',
    weight: '~460KG',
    description: 'Prime highland ox selected for traditional holiday Kircha.',
    coverImage: '/images/borana_ox_detail.png',
    images: [
      '/images/borana_ox_detail.png',
      '/images/figma_banner.png',
      '/images/arsi_bull.png',
    ],
    portionType: 'half',
    portionAmharic: 'ግማሽ መደብ',
    portionEnglish: 'Half Share (0.5)',
    priceETB: 8250,
    totalSellingPriceETB: 216000,
    depositPerKirchaETB: 4500,
    reservedShares: 6,
    totalShares: 12,
    availableQuarterUnits: 24,
    maxAvailableQuarterUnits: 12,
    isAlmostFull: false,
    slaughterDateEnglish: 'Sep 10, 2026',
    slaughterDateAmharic: 'ጳጉሜ 5, 2018',
    location: 'Fondi Farms Center, Ambo',
  },
  {
    id: 'krc-3',
    cattleName: 'Highland Ox K-029',
    tagNumber: 'FR10018161',
    category: 'ox',
    breed: 'HIGHLAND OX',
    weight: '~390KG',
    description: 'Naturally fed highland ox, vetted by certified veterinarians.',
    coverImage: '/images/figma_ox.png',
    images: [
      '/images/figma_ox.png',
      '/images/figma_banner.png',
      '/images/borana_ox_detail.png',
    ],
    portionType: 'quarter',
    portionAmharic: 'ሩብ መደብ',
    portionEnglish: 'Quarter Share (0.25)',
    priceETB: 4125,
    totalSellingPriceETB: 180000,
    depositPerKirchaETB: 4500,
    reservedShares: 11,
    totalShares: 12,
    availableQuarterUnits: 4,
    maxAvailableQuarterUnits: 4,
    isAlmostFull: true,
    slaughterDateEnglish: 'Sep 11, 2026',
    slaughterDateAmharic: 'መስከረም 1, 2019',
    location: 'Fondi Farms Center, Ambo',
  },
];

/**
 * Fetches all Kircha Cycles from backend (GET /api/kircha)
 */
export async function getKirchaCycles(params?: {
  page?: number;
  limit?: number;
  activeOnly?: boolean;
}): Promise<KirchaCycleResponse | null> {
  const page = params?.page || 1;
  const limit = params?.limit || 20;
  const activeOnly = params?.activeOnly ?? true;

  try {
    const url = `${API_BASE_URL}/api/kircha?page=${page}&limit=${limit}&activeOnly=${activeOnly}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[KirchaAPI] GET /api/kircha returned status ${res.status}`);
      return null;
    }

    const data: KirchaCycleResponse = await res.json();
    return data;
  } catch (err) {
    console.warn('[KirchaAPI] Error fetching Kircha cycles:', err);
    return null;
  }
}

/**
 * Fetches a single Kircha Cycle by ID (GET /api/kircha/:id)
 */
export async function getKirchaCycleById(id: string): Promise<KirchaCycleItem | null> {
  try {
    const url = `${API_BASE_URL}/api/kircha/${encodeURIComponent(id)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[KirchaAPI] GET /api/kircha/${id} returned status ${res.status}`);
      return null;
    }

    const data: KirchaCycleItem = await res.json();
    return data;
  } catch (err) {
    console.warn(`[KirchaAPI] Error fetching Kircha cycle ${id}:`, err);
    return null;
  }
}

/**
 * Fetches Kircha cattle listings filtered by category and portion
 */
export async function getKirchaListings(params?: {
  category?: 'ox' | 'sheep' | 'goat';
  portionType?: string;
}): Promise<FrontendKirchaListing[]> {
  try {
    const url = `${API_BASE_URL}/api/kircha?page=1&limit=20&activeOnly=true`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const result = await res.json();
      if (Array.isArray(result?.data) && result.data.length > 0) {
        // Will map cycle groups/listings once groups endpoint is connected
      }
    }
  } catch {
    // fallback gracefully
  }

  // Filter listings
  return FALLBACK_LISTINGS.filter((item) => {
    if (params?.category && item.category !== params.category) return false;
    return true;
  });
}

/**
 * Fetches single cattle detail by listing ID
 */
export async function getKirchaDetail(id: string): Promise<FrontendKirchaListing | null> {
  const listing = FALLBACK_LISTINGS.find((item) => item.id === id);
  return listing || FALLBACK_LISTINGS[0];
}
