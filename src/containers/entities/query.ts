export const QUERY = {
  concerts: 'concerts',
  concert: 'concert',
  access: 'access',
  map: 'map',
  orchestras: 'orchestras',
  orchestra: 'orchestra',
  participation: 'participation',
  belong: 'belong',
  user: 'user',
} as const;

export type Query = typeof QUERY[keyof typeof QUERY];
