import type { EvanVenue } from '@evan/types';

export function venueMapUrl(venue: EvanVenue): string {
  if (venue.gmaps) return venue.gmaps;
  const query = encodeURIComponent(`${venue.name}, ${venue.city || 'Ghent'}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
