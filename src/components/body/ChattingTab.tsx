import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    changeTab: (tab: string) => void;
    currentTab: string;
}

type Styles = {
    container: string;
    containerSelected: string;
};

const ChattingTab = (props: Props) => {
    const styles: Styles = {
        container: 'absolute right-[60%] border-b-2 border-r-2 border-l-2 rounded-b-lg px-2 text-sm md:text-base ',
        containerSelected:
            'absolute right-[60%] border-b-2 border-r-2 border-l-2 rounded-b-lg px-2 text-sm md:text-base ',
    };

    const theme = useContext(ThemeContext);

    if (props.currentTab === 'chat')
        return (
            <button
                className={
                    styles.containerSelected +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-500 hover:bg-${theme?.themeColor}-100`
                }
                onClick={() => props.changeTab('chat')}
            >
                Chat
            </button>
        );

    return (
        <button
            className={
                styles.container +
                `bg-${theme?.themeColor}-200 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-100`
            }
            onClick={() => props.changeTab('chat')}
        >
            Chat
        </button>
    );
};

export default ChattingTab;
