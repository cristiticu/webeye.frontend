export type ScheduledCheckConfiguration = {
    url: string;
    zones: string[];
    check_string: string;
    accepted_status: string[];
    timeout: number;
    save_screenshot: boolean;
};

export type ScheduledCheck = {
    guid: string;
    u_guid: string;
    w_guid: string;
    task_type: string;
    interval: string;
    days: string;
    configuration: ScheduledCheckConfiguration;
    c_at: string;
};

export type FetchScheduledChecksParams = {
    url: string;
};

export type AddScheduledCheckParams = {
    url: string;
    interval: string;
    days: string;
    zones: string[];
    check_string: string | null;
    accepted_status: string[];
    timeout: number;
};
