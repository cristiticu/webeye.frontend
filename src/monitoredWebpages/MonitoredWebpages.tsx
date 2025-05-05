import './MonitoredWebpages.less';
import { For, Spinner, Tabs } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFetchMonitoredWebpagesQuery } from './service';
import AddMonitoredWebpageButton from './AddMonitoredWebpageButton';
import MonitoredWebpageTab from './MonitoredWebpageTab';

type Props = {
    children: ReactNode;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
};

export default function MonitoredWebpages({ children, lazyMount, unmountOnExit }: Props) {
    const { data: webpages, isLoading: isLoadingWebpages } = useFetchMonitoredWebpagesQuery();

    return (
        <div className="monitored-webpages-tabs">
            {isLoadingWebpages && <Spinner />}
            {!isLoadingWebpages && webpages.length === 0 && <>Add a webpage</>}
            {!isLoadingWebpages && webpages.length > 0 && (
                <>
                    <Tabs.Root
                        className="tabs"
                        variant="line"
                        lazyMount={lazyMount}
                        unmountOnExit={unmountOnExit}
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
                                <AddMonitoredWebpageButton />
                            </Tabs.List>
                        )}
                    </Tabs.Root>
                    {children}
                </>
            )}
        </div>
    );
}
