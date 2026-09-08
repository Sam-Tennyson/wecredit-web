export type ZapcashSsoRedirectOverlayState = 'idle' | 'loading' | 'error';

export interface ZapcashSsoRedirectOverlayProps {
  readonly state: ZapcashSsoRedirectOverlayState;
  readonly errorMessage: string | null;
  readonly onDismiss: () => void;
}
