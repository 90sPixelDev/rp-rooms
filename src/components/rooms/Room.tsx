import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    title: string;
    selected: boolean;
}
type Styles = {
    container: string;
    selectedContainer: string;
    topPad: string;
    roomTitle: string;
    bottomPad: string;
    selectedTopPad: string;
    selectedRoomTitle: string;
    selectedBottomPad: string;
};

const Room = (props: Props) => {
    const styles: Styles = {
        container: 'w-[90%] hover:text-purple-600 transition cursor-pointer',
        selectedContainer: 'w-[100%] rounded-tl-full hover:text-purple-600 ',
        topPad: 'h-[10px] rounded-br-full transition ',
        roomTitle: 'ml-2 text-sm md:text-base',
        bottomPad: 'h-[10px] transition border-t-2 ',
        selectedTopPad: 'h-[10px] rounded-br-full transition ',
        selectedRoomTitle: 'w-full rounded-tl-lg rounded-r-lg text-left pl-5 cursor-default text-sm md:text-base ',
        selectedBottomPad: 'h-[10px] rounded-tr-full transition border-t-2 ',
    };

    const theme = useContext(ThemeContext);

    if (props.selected)
        return (
            <div className={styles.selectedContainer + `bg-${theme?.themeColor}-100`}>
                <div className={styles.selectedTopPad + `bg-${theme?.themeColor}-200`} />
                <button className={styles.selectedRoomTitle + `bg-${theme?.themeColor}-100`}>{props.title}</button>
                <div
                    className={styles.selectedBottomPad + `bg-${theme?.themeColor}-200 border-${theme?.themeColor}-400`}
                />
            </div>
        );

    return (
        <div className={styles.container}>
            <div className={styles.topPad + `bg-${theme?.themeColor}-200`} />
            <button className={styles.roomTitle}>{props.title}</button>
            <div className={styles.bottomPad + `bg-${theme?.themeColor}-200 border-${theme?.themeColor}-400`} />
        </div>
    );
};

export default Room;
