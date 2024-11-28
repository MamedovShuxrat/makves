import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';


const lightTheme = {
    sidebarBackground: 'var(--color-sidebar-background-light-default)',
    sidebarActive: 'var(--color-sidebar-background-light-active)',
    textColor: 'var(--color-text-light-default)',
    buttonBackground: 'var(--color-button-background-light-default)',
    buttonHover: 'var(--color-sidebar-background-light-hover)',
    buttonActive: 'var(--color-button-background-light-active)',
};

const darkTheme = {
    sidebarBackground: 'var(--color-sidebar-background-dark-default)',
    sidebarActive: 'var(--color-sidebar-background-dark-active)',
    textColor: 'var(--color-text-dark-default)',
    buttonBackground: 'var(--color-button-background-dark-default)',
    buttonHover: 'var(--color-sidebar-background-dark-hover)',
    buttonActive: 'var(--color-button-background-dark-active)',

};

const shakerLeft = keyframes`
    0% {
        transform: translateX(0px);
    }
    50% {
        transform: translateX(-5px);
    }
    100% {
        transform: translateX(0);
    }
`;

const shakerRight = keyframes`
    0% {
        transform: translateX(0px);
    }
    50% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(0);
    }
`;

const SidebarWrapper = styled.div`
  width:  60px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.textColor};
  transition: background-color 0.3s ease, color 0.3s ease, width .3s ease-out;
  &.isOpened {
    width: 300px;  
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const Logo = styled.img`
  width: 40px;
`;

const SidebarTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 5px;
    right: -15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background-color: ${({ theme }) => theme.textColor === 'var(--color-button-background-light-default) ' ? '#fff' : ''};
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &.active {
        background-color: ${({ theme }) => theme.buttonActive === 'var(--color-button-background-light-active)' ? '#e2e8f0' : '#4B5966'};
`;
const Icon = styled(FontAwesomeIcon)`
transition: transform 0.3s ease;

    &:hover {
    animation: ${({ isOpened }) => (isOpened ? shakerLeft : shakerRight)} 0.5s ease forwards;
}
`;
const Menu = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;

`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;


  &:hover {
    background-color: ${({ theme }) => theme.sidebarBackground === 'var(--color-sidebar-background-light)' ? '#f0f2ff' : '#2D2E34'};
}

 &.active {
    background-color: ${({ theme }) => theme.sidebarActive === 'var(--color-sidebar-background-light-active)' ? '#f0f2ff' : '#393A3F'};
}

  span {
    margin-left: 10px;
}

    FontAwesomeIcon {
        width:100%
}
`;

const BottomRoutes = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const Sidebar = (props) => {
    const { color } = props;
    const [isOpened, setIsOpened] = useState(false);

    const theme = color === 'dark' ? darkTheme : lightTheme;

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (title) => {
        setActiveItem(title);
    };

    const toggleSidebar = () => {
        setIsOpened(!isOpened);
    };

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    return (
        <SidebarWrapper theme={theme} className={isOpened ? 'isOpened' : ''}>
            <SidebarHeader>
                <Logo src={logo} alt="TensorFlow logo" />
                {isOpened && <SidebarTitle>TensorFlow</SidebarTitle>}
                <ToggleButton onClick={toggleSidebar}>
                    <Icon width={18} height={18} icon={isOpened ? 'angle-left' : 'angle-right'} isOpened={isOpened} />
                </ToggleButton>
            </SidebarHeader>
            <Menu>
                {
                    routes.map(route => (
                        <MenuItem
                            key={route.title}
                            className={activeItem === route.title ? 'active' : ''}
                            onClick={() => {
                                handleItemClick(route.title),
                                    goToRoute(route.path)
                            }}
                        >
                            <FontAwesomeIcon width={18} height={18} icon={route.icon} />
                            {isOpened && <span>{route.title}</span>}
                        </MenuItem>
                    ))
                }
                <BottomRoutes>
                    {
                        bottomRoutes.map(route => (
                            <MenuItem
                                key={route.title}
                                className={activeItem === route.title ? 'active' : ''}
                                onClick={() => {
                                    handleItemClick(route.title),
                                        goToRoute(route.path);
                                }}
                            >
                                <FontAwesomeIcon width={18} height={18} icon={route.icon} />
                                {isOpened && <span>{route.title}</span>}
                            </MenuItem>
                        ))
                    }
                </BottomRoutes>
            </Menu>
        </SidebarWrapper>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
