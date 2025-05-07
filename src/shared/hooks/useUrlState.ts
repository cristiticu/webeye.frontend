import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function extractState(searchParams: URLSearchParams) {
    const extracted: Record<string, string> = {};

    searchParams.forEach((value, key) => {
        extracted[key] = value;
    });

    return extracted;
}

export default function useUrlState(): [Record<string, string>, (params: Record<string, string>) => void] {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const state = useMemo(() => extractState(searchParams), [searchParams]);

    const setState = useCallback(
        (params: Record<string, string>) => {
            let search = null;
            const searchParams = new URLSearchParams(params);

            if (Object.keys(params).length > 0) {
                search = '?' + searchParams.toString();
                navigate({ pathname: location.pathname, search: search }, { replace: true });
            } else {
                navigate({ pathname: location.pathname }, { replace: true });
            }
        },
        [location.pathname, navigate]
    );

    return [state, setState];
}
