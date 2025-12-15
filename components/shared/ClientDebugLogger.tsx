'use client';

import { useEffect } from 'react';

/**
 * Development-only component that logs data to browser console
 */
export function ClientDebugLogger({ data, label }: { data: any; label: string }) {
  useEffect(() => {
    console.log(`🔍 ${label}:`, data);
  }, [data, label]);
  
  return null;
}

