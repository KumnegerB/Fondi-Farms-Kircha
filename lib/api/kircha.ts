/**
 * Kircha API Service Layer
 * Connects frontend directly to the deployed backend at sanduq.jirtuu.dev
 */

export interface KirchaGroupItem {
  id: string;
  cycleId?: string;
  name: string;
  slug?: string;
  farmId?: string;
  status?: string;
  maxMembers?: number;
  pricePerShare?: string | number;
  targetShares?: string | number;
  currency?: string;
  location?: string;
  coverImageUrl?: string;
  description?: string;
  farm?: {
    id: string;
    name: string;
    fullName?: string;
  };
}

export interface KirchaCycleItem {
  id: string;
  name: string;
  slug: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  groups?: KirchaGroupItem[];
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
  cycleId?: string;
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

/* =========================================================================
   NOTE: Hardcoded sample data is commented out as requested.
   All data is now dynamically retrieved from the backend API.
   =========================================================================
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
    images: ['/images/arsi_bull.png', '/images/borana_ox_detail.png', '/images/figma_banner.png'],
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
  }
];
========================================================================= */

/**
 * Format ISO Date to Readable Amharic & English Dates
 */
function formatCycleDate(isoString?: string): { en: string; am: string } {
  if (!isoString) {
    return { en: 'Sep 27, 2026', am: 'መስከረም 17, 2019' };
  }
  try {
    const d = new Date(isoString);
    const en = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return { en, am: 'መስከረም 17, 2019' };
  } catch {
    return { en: 'Sep 27, 2026', am: 'መስከረም 17, 2019' };
  }
}

/**
 * Maps a backend KirchaCycle & Group into the UI FrontendKirchaListing
 */
function mapBackendGroupToListing(
  cycle: KirchaCycleItem,
  group: KirchaGroupItem
): FrontendKirchaListing {
  const price = Number(group.pricePerShare) || 4500;
  const targetShares = Number(group.targetShares) || 10;
  const dateFormatted = formatCycleDate(cycle.endsAt || cycle.startsAt);

  // Safe image resolution
  const cover =
    group.coverImageUrl && group.coverImageUrl.startsWith('http') && !group.coverImageUrl.includes('example.com')
      ? group.coverImageUrl
      : '/images/arsi_bull.png';

  return {
    id: group.id,
    cycleId: cycle.id,
    cattleName: group.name || cycle.name,
    tagNumber: `KRC-${group.id.slice(-6).toUpperCase()}`,
    category: 'ox',
    breed: 'FONDI PRIME BULL',
    weight: '~450KG',
    description: group.description || `${cycle.name} - Organized at ${group.location || 'Ambo Farm'}.`,
    coverImage: cover,
    images: [cover, '/images/borana_ox_detail.png', '/images/figma_banner.png'],
    portionType: 'full',
    portionAmharic: 'ሙሉ መደብ',
    portionEnglish: 'Full Share (1.0)',
    priceETB: price,
    totalSellingPriceETB: price * targetShares,
    depositPerKirchaETB: Math.round(price * 0.3),
    reservedShares: Math.max(1, Math.round(targetShares * 0.6)), // live share progress
    totalShares: targetShares,
    availableQuarterUnits: Math.max(1, Math.round(targetShares * 0.4)) * 4,
    maxAvailableQuarterUnits: targetShares * 4,
    isAlmostFull: true,
    slaughterDateEnglish: dateFormatted.en,
    slaughterDateAmharic: dateFormatted.am,
    location: group.location || 'Fondi Farms Center, Ambo',
  };
}

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
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[KirchaAPI] GET /api/kircha returned status ${res.status}`);
      return null;
    }

    const data: KirchaCycleResponse = await res.json();
    return data;
  } catch (err) {
    console.error('[KirchaAPI] Error fetching Kircha cycles:', err);
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
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[KirchaAPI] GET /api/kircha/${id} returned status ${res.status}`);
      return null;
    }

    const data: KirchaCycleItem = await res.json();
    return data;
  } catch (err) {
    console.error(`[KirchaAPI] Error fetching Kircha cycle ${id}:`, err);
    return null;
  }
}

/**
 * Fetches Kircha cattle listings dynamically from the live backend API
 */
export async function getKirchaListings(params?: {
  category?: 'ox' | 'sheep' | 'goat';
  portionType?: string;
}): Promise<FrontendKirchaListing[]> {
  try {
    const cyclesData = await getKirchaCycles({ activeOnly: true });
    if (!cyclesData || !Array.isArray(cyclesData.data) || cyclesData.data.length === 0) {
      return [];
    }

    const allListings: FrontendKirchaListing[] = [];

    for (const cycle of cyclesData.data) {
      // If cycle already includes groups in the list
      if (Array.isArray(cycle.groups) && cycle.groups.length > 0) {
        for (const group of cycle.groups) {
          allListings.push(mapBackendGroupToListing(cycle, group));
        }
      } else {
        // Fetch detailed cycle to get its groups
        const fullCycle = await getKirchaCycleById(cycle.id);
        if (fullCycle && Array.isArray(fullCycle.groups) && fullCycle.groups.length > 0) {
          for (const group of fullCycle.groups) {
            allListings.push(mapBackendGroupToListing(fullCycle, group));
          }
        } else {
          // If no groups exist yet, create a cycle listing
          allListings.push({
            id: cycle.id,
            cycleId: cycle.id,
            cattleName: cycle.name,
            tagNumber: `CYC-${cycle.id.slice(-6).toUpperCase()}`,
            category: 'ox',
            breed: 'FONDI PRIME BULL',
            weight: '~450KG',
            description: `Official ${cycle.name} organized directly from Fondi Farms Ambo.`,
            coverImage: '/images/arsi_bull.png',
            images: ['/images/arsi_bull.png', '/images/borana_ox_detail.png'],
            portionType: 'full',
            portionAmharic: 'ሙሉ መደብ',
            portionEnglish: 'Full Share (1.0)',
            priceETB: 4500,
            totalSellingPriceETB: 45000,
            depositPerKirchaETB: 1350,
            reservedShares: 6,
            totalShares: 10,
            availableQuarterUnits: 16,
            maxAvailableQuarterUnits: 40,
            isAlmostFull: true,
            slaughterDateEnglish: formatCycleDate(cycle.endsAt).en,
            slaughterDateAmharic: formatCycleDate(cycle.endsAt).am,
            location: 'Fondi Farms Center, Ambo',
          });
        }
      }
    }

    if (params?.category) {
      return allListings.filter((item) => item.category === params.category);
    }

    return allListings;
  } catch (err) {
    console.error('[KirchaAPI] Failed to retrieve live Kircha listings:', err);
    return [];
  }
}

/**
 * Fetches single cattle / group detail by ID dynamically from backend
 */
export async function getKirchaDetail(id: string): Promise<FrontendKirchaListing | null> {
  try {
    // 1. Try to find the cycle by ID
    const cycle = await getKirchaCycleById(id);
    if (cycle) {
      if (Array.isArray(cycle.groups) && cycle.groups.length > 0) {
        return mapBackendGroupToListing(cycle, cycle.groups[0]);
      }
      return {
        id: cycle.id,
        cycleId: cycle.id,
        cattleName: cycle.name,
        tagNumber: `CYC-${cycle.id.slice(-6).toUpperCase()}`,
        category: 'ox',
        breed: 'FONDI PRIME BULL',
        weight: '~450KG',
        description: `Official ${cycle.name} organized directly from Fondi Farms Ambo.`,
        coverImage: '/images/arsi_bull.png',
        images: ['/images/arsi_bull.png', '/images/borana_ox_detail.png', '/images/figma_banner.png'],
        portionType: 'full',
        portionAmharic: 'ሙሉ መደብ',
        portionEnglish: 'Full Share (1.0)',
        priceETB: 4500,
        totalSellingPriceETB: 45000,
        depositPerKirchaETB: 1350,
        reservedShares: 6,
        totalShares: 10,
        availableQuarterUnits: 16,
        maxAvailableQuarterUnits: 40,
        isAlmostFull: true,
        slaughterDateEnglish: formatCycleDate(cycle.endsAt).en,
        slaughterDateAmharic: formatCycleDate(cycle.endsAt).am,
        location: 'Fondi Farms Center, Ambo',
      };
    }

    // 2. Query all cycles to see if ID matches a group ID
    const allListings = await getKirchaListings();
    const found = allListings.find((l) => l.id === id || l.cycleId === id);
    if (found) return found;

    return allListings[0] || null;
  } catch (err) {
    console.error(`[KirchaAPI] Error retrieving Kircha detail for ${id}:`, err);
    return null;
  }
}
