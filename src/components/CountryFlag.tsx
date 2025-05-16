import US from 'country-flag-icons/react/3x2/US';
import CA from 'country-flag-icons/react/3x2/CA';
import BR from 'country-flag-icons/react/3x2/BR';
import IN from 'country-flag-icons/react/3x2/IN';
import SG from 'country-flag-icons/react/3x2/SG';
import AU from 'country-flag-icons/react/3x2/AU';
import JP from 'country-flag-icons/react/3x2/JP';
import KR from 'country-flag-icons/react/3x2/KR';
import DE from 'country-flag-icons/react/3x2/DE';
import IE from 'country-flag-icons/react/3x2/IE';
import GB from 'country-flag-icons/react/3x2/GB';
import FR from 'country-flag-icons/react/3x2/FR';
import SE from 'country-flag-icons/react/3x2/SE';
import { FunctionComponent } from 'react';

const FLAGS: Record<string, FunctionComponent<{ title?: string; style?: React.CSSProperties }>> = {
    US,
    CA,
    BR,
    IN,
    SG,
    AU,
    JP,
    KR,
    DE,
    IE,
    GB,
    FR,
    SE,
};

type Props = {
    countryCode: keyof typeof FLAGS;
    title?: string;
    style?: React.CSSProperties;
};

export const CountryFlag = ({ countryCode, title, style }: Props) => {
    const Flag = FLAGS[countryCode];
    return Flag ? (
        <Flag
            title={title}
            style={{ width: '24px', ...style }}
        />
    ) : null;
};
