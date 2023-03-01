import React, { useEffect, useState } from 'react';

type Props = {
    children?: React.ReactNode;
};

interface Theme {
    themeColor: string;
    themeSwitch: (newColor: string) => void;
}

export const ThemeContext = React.createContext<Theme | null>(null);

export const ThemeContextProvider = ({ children }: Props) => {
    const [themeColor, setThemeColor] = useState('');

    const setMode = (color: string) => {
        window.localStorage.setItem('theme', color);
        setThemeColor(color);
    };

    const themeSwitch = (newColor: string) => setMode(newColor);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setThemeColor(localTheme) : setMode('emerald');
    }, []);

    return <ThemeContext.Provider value={{ themeColor, themeSwitch }}>{children}</ThemeContext.Provider>;
};
