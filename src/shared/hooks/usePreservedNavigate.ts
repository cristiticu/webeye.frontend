import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook that enables navigation without destroying the search string
 * @params **search**: if null erase the search. If undefined, keep the old search string
 * @returns
 */
export function usePreservedNavigate() {
    const navigate = useNavigate();
    const location = useLocation();

    const preservedNavigate = useCallback(
        (pathname: string, search?: string | null, state?: Record<string, string>) => {
            if (search === null) {
                navigate(pathname, { state: state });
            } else if (typeof search === 'undefined') {
                navigate({ pathname, search: location.search }, { state });
            } else {
                navigate({ pathname, search }, { state });
            }
        },
        [location.search, navigate]
    );

    return preservedNavigate;
}
