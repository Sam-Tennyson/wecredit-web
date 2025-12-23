import { create } from 'zustand';
import type { Page } from '@/types/strapi';
import { devtools } from 'zustand/middleware';

/**
 * Page store state interface
 */
interface PageState {
	page: Page | null;
	setPage: (page: Page) => void;
	clearPage: () => void;
}

/**
 * Zustand store for page data
 * Hydrated from server-fetched data, accessible in any client component
 */
export const usePageStore = create<PageState>()(
	devtools(
		(set) => ({
			page: null,
			setPage: (page: Page) => set({ page }),
			clearPage: () => set({ page: null }),
		}),
		{
			name: 'page-store',
		}
	)
);

