import { z } from 'zod';

export const LocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  countryCode: z.string().length(2),
  members: z.number().positive(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  mapPosition: z.object({
    left: z.string(),
    top: z.string(),
  }),
  onlineNow: z.number().optional(),
  timezone: z.string().optional(),
  flag: z.string().optional(),
});

export type Location = z.infer<typeof LocationSchema>;

export const globalLocations: Location[] = [
  {
    city: 'San Francisco',
    country: 'United States',
    countryCode: 'us',
    members: 324,
    coordinates: { lat: 37.77, lng: -122.41 },
    mapPosition: { left: '17%', top: '35%' },
    onlineNow: 42,
    flag: '🇺🇸',
    timezone: 'America/Los_Angeles',
  },
  {
    city: 'New York',
    country: 'United States',
    countryCode: 'us',
    members: 298,
    coordinates: { lat: 40.71, lng: -74.00 },
    mapPosition: { left: '22%', top: '34%' },
    onlineNow: 42,
    flag: '🇺🇸',
    timezone: 'America/New_York',
  },
  {
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'ca',
    members: 132,
    coordinates: { lat: 43.65, lng: -79.38 },
    mapPosition: { left: '23%', top: '33%' },
    onlineNow: 18,
    flag: '🇨🇦',
    timezone: 'America/Toronto',
  },
  {
    city: 'São Paulo',
    country: 'Brazil',
    countryCode: 'br',
    members: 154,
    coordinates: { lat: -23.55, lng: -46.63 },
    mapPosition: { left: '30%', top: '64%' },
    onlineNow: 28,
    flag: '🇧🇷',
    timezone: 'America/Sao_Paulo',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'gb',
    members: 289,
    coordinates: { lat: 51.51, lng: -0.13 },
    mapPosition: { left: '47%', top: '27%' },
    onlineNow: 67,
    flag: '🇬🇧',
    timezone: 'Europe/London',
  },
  {
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'de',
    members: 198,
    coordinates: { lat: 52.52, lng: 13.40 },
    mapPosition: { left: '50%', top: '26%' },
    onlineNow: 35,
    flag: '🇩🇪',
    timezone: 'Europe/Berlin',
  },
  {
    city: 'Lagos',
    country: 'Nigeria',
    countryCode: 'ng',
    members: 98,
    coordinates: { lat: 6.52, lng: 3.38 },
    mapPosition: { left: '48%', top: '50%' },
    onlineNow: 19,
    flag: '🇳🇬',
    timezone: 'Africa/Lagos',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    members: 87,
    coordinates: { lat: 25.20, lng: 55.27 },
    mapPosition: { left: '58%', top: '40%' },
    onlineNow: 24,
    flag: '🇦🇪',
    timezone: 'Asia/Dubai',
  },
  {
    city: 'Mumbai',
    country: 'India',
    countryCode: 'in',
    members: 167,
    coordinates: { lat: 19.08, lng: 72.88 },
    mapPosition: { left: '65%', top: '43%' },
    onlineNow: 53,
    flag: '🇮🇳',
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    countryCode: 'sg',
    members: 89,
    coordinates: { lat: 1.35, lng: 103.82 },
    mapPosition: { left: '73%', top: '54%' },
    onlineNow: 31,
    flag: '🇸🇬',
    timezone: 'Asia/Singapore',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'jp',
    members: 176,
    coordinates: { lat: 35.68, lng: 139.69 },
    mapPosition: { left: '82%', top: '33%' },
    onlineNow: 46,
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo',
  },
  {
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'au',
    members: 143,
    coordinates: { lat: -33.87, lng: 151.21 },
    mapPosition: { left: '84%', top: '70%' },
    onlineNow: 22,
    flag: '🇦🇺',
    timezone: 'Australia/Sydney',
  },
];

if (import.meta.env.DEV) {
  try {
    globalLocations.forEach((location, index) => {
      LocationSchema.parse(location);
    });
    console.log('✅ Global locations validated successfully');
  } catch (error) {
    console.error('❌ Global locations validation failed:', error);
    throw error;
  }
}

export function getLocationByCity(city: string): Location | undefined {
  return globalLocations.find(l => l.city.toLowerCase() === city.toLowerCase());
}

export function getLocationsByCountry(countryCode: string): Location[] {
  return globalLocations.filter(l => l.countryCode.toLowerCase() === countryCode.toLowerCase());
}

export function getTopLocationsByMembers(limit: number = 10): Location[] {
  return [...globalLocations]
    .sort((a, b) => b.members - a.members)
    .slice(0, limit);
}

export function getTopLocationsByOnline(limit: number = 10): Location[] {
  return [...globalLocations]
    .filter(l => l.onlineNow !== undefined)
    .sort((a, b) => (b.onlineNow || 0) - (a.onlineNow || 0))
    .slice(0, limit);
}

export function getTotalMembers(): number {
  return globalLocations.reduce((sum, location) => sum + location.members, 0);
}

export function getTotalOnline(): number {
  return globalLocations.reduce((sum, location) => sum + (location.onlineNow || 0), 0);
}

export function getMapHotspots() {
  return globalLocations.map(loc => ({
    city: loc.city,
    info: `${loc.onlineNow || 0} online`,
    left: loc.mapPosition.left,
    top: loc.mapPosition.top,
  }));
}

export function getMemberMapHotspots() {
  return globalLocations.map(loc => ({
    city: loc.city,
    country: loc.country,
    members: loc.members,
    lat: loc.coordinates.lat,
    lng: loc.coordinates.lng,
    flag: loc.countryCode,
  }));
}
