export type MonitoredWebpage = {
    guid: string;
    u_guid: string;
    url: string;
    screenshot_m_at: string | null;
    c_at: string;
};

export type AddMonitoredWebpageParams = {
    url: string;
};

export type DeleteMonitoredWebpageParams = {
    url: string;
};
