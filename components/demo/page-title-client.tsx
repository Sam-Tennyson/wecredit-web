'use client';

import { usePageStore } from '@/stores/page-store';

/**
 * Demo client component that reads page data from Zustand store
 * This proves the store is hydrated with server data
 */
export function PageTitleClient() {
  const page = usePageStore((state) => state.page);
  
  if (!page) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
        <p className="text-yellow-800 text-sm">
          ⏳ Zustand store not yet hydrated...
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
      <p className="text-green-800 text-sm font-medium">
        ✅ Zustand Demo - Reading from store:
      </p>
      <p className="text-green-900 text-lg font-bold mt-1">
        {page?.title}
      </p>
      <p className="text-green-700 text-xs mt-2">
        Page ID: {page?.documentId} | Type: {page?.pageType || 'standard'}
      </p>
    </div>
  );
}

