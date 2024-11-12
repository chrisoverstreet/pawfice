'use client';

import { getBrowserClient } from '@/lib/supabase/get-browser-client';
import type { TransformOptions } from '@supabase/storage-js';

export default function useTransformedImage({
  originalUrl,
  transformOptions,
}: {
  originalUrl?: string | null;
  transformOptions: TransformOptions;
}) {
  if (!originalUrl) {
    return undefined;
  }

  const supabase = getBrowserClient();

  const { bucket, asset_name } = parseSupabaseUrl(originalUrl);

  if (!bucket || !asset_name) {
    return undefined;
  }

  return supabase.storage
    .from(bucket)
    .getPublicUrl(asset_name, { transform: transformOptions }).data.publicUrl;
}

function parseSupabaseUrl(url: string) {
  try {
    // Create URL object to parse the URL
    const urlObj = new URL(url);

    // Split the pathname into segments and remove empty strings
    const segments = urlObj.pathname.split('/').filter(Boolean);

    // For standard Supabase URLs, project ID is in the hostname
    const projectId = urlObj.hostname.startsWith('[')
      ? urlObj.hostname.match(/\[(.*?)\]/)?.[1] || null
      : null;

    // Find bucket and asset name from path segments
    // The path structure is: /storage/v1/object/public/[bucket]/[...asset_path]
    const publicIndex = segments.indexOf('public');
    if (publicIndex === -1 || publicIndex + 1 >= segments.length) {
      return { projectId: null, bucket: null, asset_name: null };
    }

    const bucket = segments[publicIndex + 1];

    // Get all segments after the bucket and join them
    const assetSegments = segments.slice(publicIndex + 2);
    const asset_name =
      assetSegments.length > 0 ? assetSegments.join('/') : null;

    return {
      projectId,
      bucket,
      asset_name,
    };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return { projectId: null, bucket: null, asset_name: null };
  }
}
