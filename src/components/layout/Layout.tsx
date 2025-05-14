import { Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import MenuBar from './MenuBar';
import { AiFillSnippets, AiFillSignal, AiFillEye } from 'react-icons/ai';

const menuItems = {
    dashboard: { label: 'Dashboard', hidden: false },
    monitors: { label: 'Monitors', hidden: false },
    events: { label: 'Events & Downtimes', hidden: false },
    account: { label: 'User Account', hidden: true },
};

const menuIcons = {
    dashboard: AiFillSnippets,
    monitors: AiFillEye,
    events: AiFillSignal,
};

export default function Layout() {
    const location = useLocation();

    const selectedMenu = location.pathname.split('/')[1];

    const pageTitle = menuItems[selectedMenu].label || 'Page not found';

    return (
        <Flex height="100vh">
            <MenuBar
                menuItems={menuItems}
                menuIcons={menuIcons}
                selectedMenu={selectedMenu}
            />
            <NavBar pageTitle={pageTitle} />
        </Flex>
    );
}
