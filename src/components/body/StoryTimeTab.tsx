import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = any;
type Styles = {
    container: string;
    containerSelected: string;
};

const StoryTimeTab = (props: Props) => {
    const styles: Styles = {
        container: 'absolute left-[60%] border-b-2 border-r-2 border-l-2 rounded-b-lg px-2 text-sm md:text-base ',
        containerSelected:
            'absolute left-[60%] border-b-2 border-r-2 border-l-2  rounded-b-lg px-2 text-sm md:text-base ',
    };

    const theme = useContext(ThemeContext);

    if (props.currentTab === 'story')
        return (
            <button
                className={
                    styles.containerSelected +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-500 hover:bg-${theme?.themeColor}-100`
                }
                onClick={() => props.changeTab('story')}
            >
                Story
            </button>
        );

    return (
        <button
            className={
                styles.container +
                `bg-${theme?.themeColor}-200 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-100`
            }
            onClick={() => props.changeTab('story')}
        >
            Story
        </button>
    );
};

export default StoryTimeTab;
