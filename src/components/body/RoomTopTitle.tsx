import React, { useState } from 'react';
import loadingAnim from '../../resources/ui/loading-anim.svg';

import { ChattingTab, StoryTimeTab } from '../exporter';

interface Props {
    currentChInfo: Record<string, any>;
    currentTab: string;
    roomTitle: string;
    changeTab: (tab: string) => void;
}
type Styles = {
    container: string;
    tabContainer: string;
    tabTitle: string;
    roomTitle: string;
    chTitle: string;
    loading: string;
};

const RoomTopTitle = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-col',
        tabContainer: 'relative w-[70%] mx-auto',
        tabTitle:
            'bg-purple-300 h-fit w-[98%] py-1 rounded-b-2xl mx-auto drop-shadow-md shadow-purple-500 flex flex-row',
        roomTitle: 'flow-root ml-2 font-bold w-fit min-h-[20px]',
        chTitle: 'flow-root ml-2 w-fit min-h-[20px]',
        loading: 'h-6 m-auto',
    };

    if (props.currentChInfo.num === '' || props.currentChInfo.num === null || props.currentChInfo.num === undefined) {
        return (
            <div className={styles.container}>
                <img className={styles.loading} src={loadingAnim} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.tabTitle}>
                <p className={styles.roomTitle}>{props.roomTitle}</p>
                <p className={styles.chTitle}>
                    | {props.currentChInfo.num}: {props.currentChInfo.desc}
                </p>
            </div>
            <div className={styles.tabContainer}>
                <ChattingTab changeTab={props.changeTab} currentTab={props.currentTab} />
                <StoryTimeTab changeTab={props.changeTab} currentTab={props.currentTab} />
            </div>
        </div>
    );
};

export default RoomTopTitle;
