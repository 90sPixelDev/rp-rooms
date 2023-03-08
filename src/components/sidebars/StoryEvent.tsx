import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    isOpened: boolean;
}
type Styles = {
    containerOpen: string;
    containerClosed: string;
};

const StoryEvent = (props: Props) => {
    const styles: Styles = {
        containerOpen: 'rounded-2xl px-1 ',
        containerClosed: 'rounded-2xl px-1 overflow-hidden ',
    };

    const theme = useContext(ThemeContext);

    if (props.isOpened)
        return (
            <button className={styles.containerOpen + `bg-${theme?.themeColor}-100 hover:bg-${theme?.themeColor}-200`}>
                StoryEvent
            </button>
        );

    return (
        <button className={styles.containerClosed + `bg-${theme?.themeColor}-100 hover:bg-${theme?.themeColor}-300`}>
            StoryEvent
        </button>
    );
};

export default StoryEvent;
