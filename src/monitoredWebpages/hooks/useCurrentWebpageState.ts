import useUrlState from '@/shared/hooks/useUrlState';
import { useCallback, useEffect, useMemo } from 'react';
import { useFetchMonitoredWebpagesQuery } from '../service';

export default function useCurrentWebpageState() {
    const [{ w_guid: webpageGuid }, setUrlState] = useUrlState();
    const { data: monitoredWebpages, isLoading: isLoadingMonitoredWebpages } = useFetchMonitoredWebpagesQuery();

    const webpage = useMemo(() => monitoredWebpages?.find((_webpage) => _webpage.guid === webpageGuid), [monitoredWebpages, webpageGuid]);

    const setCurrentWebpage = useCallback(
        (webpageGuid: string) => {
            setUrlState({ w_guid: webpageGuid });
        },
        [setUrlState]
    );

    useEffect(() => {
        if (monitoredWebpages) {
            const firstWebpage = monitoredWebpages[0];

            if (firstWebpage) {
                if (!webpageGuid) {
                    setUrlState({ w_guid: firstWebpage.guid });
                } else {
                    const webpageGuids = monitoredWebpages.map((webpage) => webpage.guid);

                    if (!webpageGuids.includes(webpageGuid)) {
                        setUrlState({ w_guid: firstWebpage.guid });
                    }
                }
            }
        }
    }, [monitoredWebpages, setUrlState, webpageGuid]);

    return {
        webpage,
        setCurrentWebpage,
        isLoadingMonitoredWebpages,
    };
}
