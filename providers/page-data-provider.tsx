'use client';

import { useEffect, useRef } from 'react';
import { usePageStore } from '@/stores/page-store';
import type { Page } from '@/types/strapi';

/**
 * Props for PageDataProvider component
 */
interface PageDataProviderProps {
  data: Page;
  children: React.ReactNode;
}

/**
 * Client component that hydrates Zustand store with server-fetched page data
 * Passes children through unchanged (preserving Server Components)
 */
export function PageDataProvider({ data, children }: PageDataProviderProps) {
  const setPage = usePageStore((state) => state.setPage);
  const hasInitialized = useRef(false);
  
  // Hydrate store on mount and when data changes
  useEffect(() => {
    if (!hasInitialized.current || data.documentId !== usePageStore.getState().page?.documentId) {
      setPage(data);
      hasInitialized.current = true;
    }
  }, [data, setPage]);
  
  return <>{children}</>;
}

