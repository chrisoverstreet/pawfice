import { Client } from 'typesense';

export function getTypesenseAdminClient() {
  return new Client({
    nodes: [{ url: process.env.NEXT_PUBLIC_TYPESENSE_URL! }],
    apiKey: process.env.TYPESENSE_API_KEY!,
    connectionTimeoutSeconds: 2,
  });
}
