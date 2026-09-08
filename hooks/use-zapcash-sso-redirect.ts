'use client';

import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { pollZapcashSsoRedirect } from '@/lib/api/zapcash-sso-redirect-service';
import { STORAGE_AUTH_TOKEN, STORAGE_MOBILE } from '@/lib/constants/api-keys';
import type { ZapcashSsoRedirectOverlayState } from '@/components/offers/zapcash-sso-redirect-overlay.types';

export const useZapcashSsoRedirect = () => {
  const [redirectState, setRedirectState] = useState<ZapcashSsoRedirectOverlayState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isPendingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const dismissZapcashSsoRedirect = useCallback((): void => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    isPendingRef.current = false;
    setRedirectState('idle');
    setErrorMessage(null);
  }, []);

  const handleZapcashSsoRedirect = useCallback(async (): Promise<void> => {
    if (isPendingRef.current) {
      return;
    }

    const mobile = getCookie(STORAGE_MOBILE) as string | undefined;
    const token = getCookie(STORAGE_AUTH_TOKEN) as string | undefined;

    if (!mobile) {
      setErrorMessage('Mobile number required');
      setRedirectState('error');
      return;
    }

    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    isPendingRef.current = true;
    setRedirectState('loading');
    setErrorMessage(null);

    const result = await pollZapcashSsoRedirect(mobile, token, abortController.signal);

    if (abortController.signal.aborted) {
      return;
    }

    if (!result.success) {
      isPendingRef.current = false;
      abortControllerRef.current = null;
      setErrorMessage(result.error ?? 'Unable to redirect to Zapcash. Please try again.');
      setRedirectState('error');
    }
  }, []);

  return {
    redirectState,
    errorMessage,
    handleZapcashSsoRedirect,
    dismissZapcashSsoRedirect,
  };
};
