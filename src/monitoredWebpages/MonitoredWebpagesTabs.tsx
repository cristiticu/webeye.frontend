import './tabs.less';
import { For, Spinner, Tabs } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFetchMonitoredWebpagesQuery } from './service';

type Props = {
    children: ReactNode;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
};

export default function MonitoredWebpagesTabs({ children, lazyMount, unmountOnExit }: Props) {
    const { data: webpages, isLoading: isLoadingWebpages } = useFetchMonitoredWebpagesQuery();

    return (
        <div className="monitored-webpages-tabs">
            <Tabs.Root
                className="tabs"
                variant="line"
                lazyMount={lazyMount}
                unmountOnExit={unmountOnExit}
            >
                {isLoadingWebpages && <Spinner />}
                {!isLoadingWebpages && (
                    <Tabs.List className="tabs-list">
                        <For each={webpages}>
                            {(webpage) => (
                                <Tabs.Trigger
                                    className="tab"
                                    key={webpage.guid}
                                    value={webpage.url}
                                >
                                    {webpage.url}
                                </Tabs.Trigger>
                            )}
                        </For>
                    </Tabs.List>
                )}
            </Tabs.Root>
            {children}
        </div>
    );
}
