import * as React from 'react';
import { RefreshData } from './types';

export function refreshUtils(): RefreshData {
    const [selectedRoomTitle, setSelectedRoomTitle] = React.useState('');
    const [currentTab, setCurrentTab] = React.useState('chat');

    const switchRoom = (newRoomName?: string) => {
        if (newRoomName !== undefined && newRoomName.length > 0) {
            setSelectedRoomTitle(newRoomName);
            console.log(
                '%c◆ Switching To' + `%c ${newRoomName} ` + '%cRoom...',
                'color: lightblue',
                'color: yellow',
                'color: lightblue;',
            );
        } else {
            setSelectedRoomTitle('');

            console.log('%c◆ Setting Up Data retrieval...', 'color: lightblue');
        }
    };

    const switchTab = React.useCallback(
        (newTab: string) => {
            console.log(
                '%c◆ Changed to ' + `%c ${newTab} ` + '%ctab!',
                'color: lightblue',
                'color: orange',
                'color: lightblue;',
            );
            setCurrentTab(newTab);
        },
        [currentTab],
    );

    return { currentTab, switchTab, selectedRoomTitle, switchRoom };
}
