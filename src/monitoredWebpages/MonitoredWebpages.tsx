import './MonitoredWebpages.less';
import { For, Spinner, Tabs } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFetchMonitoredWebpagesQuery } from './service';
import AddMonitoredWebpageButton from './AddMonitoredWebpageButton';
import MonitoredWebpageTab from './MonitoredWebpageTab';
import EmptyLayout from './EmptyLayout';
import useCurrentWebpageState from './hooks/useCurrentWebpageState';

type Props = {
    children: ReactNode;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
};

export default function MonitoredWebpages({ children, lazyMount, unmountOnExit }: Props) {
    const { webpage, setCurrentWebpage } = useCurrentWebpageState();
    const { data: webpages, isLoading: isLoadingWebpages } = useFetchMonitoredWebpagesQuery();

    return (
        <div className="monitored-webpages-tabs">
            {isLoadingWebpages && <Spinner />}
            {!isLoadingWebpages && webpages.length === 0 && <EmptyLayout />}
            {!isLoadingWebpages && webpages.length > 0 && (
                <>
                    <Tabs.Root
                        className="tabs"
                        variant="line"
                        lazyMount={lazyMount}
                        unmountOnExit={unmountOnExit}
                        value={webpage?.guid}
                        onValueChange={(event) => setCurrentWebpage(event.value)}
                    >
                        {!isLoadingWebpages && webpages.length > 0 && (
                            <Tabs.List className="tabs-list">
                                <For each={webpages}>
                                    {(webpage) => (
                                        <MonitoredWebpageTab
                                            key={webpage.guid}
                                            guid={webpage.guid}
                                            url={webpage.url}
                                        />
                                    )}
                                </For>
                                <AddMonitoredWebpageButton type="small" />
                            </Tabs.List>
                        )}
                    </Tabs.Root>
                    {children}
                </>
            )}
        </div>
    );
}
