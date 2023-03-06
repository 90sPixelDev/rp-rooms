import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = unknown;
type Styles = {
    body: string;
};

const LogInBtn = (props: Props) => {
    const styles: Styles = {
        body: 'h-8 w-20 rounded-lg text-white my-4 m-auto ',
    };

    const theme = useContext(ThemeContext);

    return (
        <button className={styles.body + `bg-${theme?.themeColor}-700 hover:bg-${theme?.themeColor}-600 `}>
            Log In
        </button>
    );
};

export default LogInBtn;
