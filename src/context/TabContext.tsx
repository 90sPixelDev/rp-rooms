import React, { createContext, useEffect, useState } from 'react';

type Props = {
    children?: React.ReactNode;
};

export const TabContextProvider = ({ children }: Props) => {
    const [currentTab, setCurrentTab] = useState('');

    const changeTab = (newTab: string) => {
        setCurrentTab(newTab);
    };

    useEffect(() => {
        if (currentTab === '') {
            setCurrentTab('chat');
        } else setCurrentTab(currentTab);
    });

    return <TabContext.Provider value={currentTab}>{children}</TabContext.Provider>;
};

export const TabContext = createContext('chat');
