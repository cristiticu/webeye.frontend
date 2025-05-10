export type MonitoringEvent = {
    u_guid: string;
    url: string;
    region: string;
    status: string;
    results: Record<string, string> | null;
    error: string | null;
    c_at: string;
    ttl: number;
};

export type DowntimePeriod = {
    u_guid: string;
    url: string;
    error: string | null;
    s_at: string;
    r_at: string;
};

export type CurrentStatus = {
    u_guid: string;
    url: string;
    region: string;
    status: string;
    error: string | null;
    m_at: string | null;
};

export type GeneralContext = {
    u_guid: string;
    url: string;
    status: string;
    error: string | null;
    downtime_s_at: string | null;
};

export type FetchEventsParams = {
    url: string;
    start_at: string;
    end_at: string;
};

export type FetchDowntimesParams = {
    url: string;
    start_at: string;
    end_at: string;
};

export type FetchGeneralContextParams = {
    url: string;
};

export type FetchRegionsStatusParams = {
    url: string;
};

export type RegionsStatus = {
    [key: string]: {
        status: string;
        lastUpdated: string | null;
        error: string | null;
    };
};
