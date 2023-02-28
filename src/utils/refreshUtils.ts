import * as React from 'react';
import { RefreshData } from './types';

export function refreshUtils(): RefreshData {
    const [selectedRoomTitle, setSelectedRoomTitle] = React.useState('');
    const [currentTab, setCurrentTab] = React.useState('story');
    const [update, setUpdate] = React.useState(false);

    const switchRoom = (newRoomName?: string) => {
        if (newRoomName !== undefined && newRoomName.length > 0) {
            setSelectedRoomTitle(newRoomName);
        } else setSelectedRoomTitle('');

        console.log(
            '%c◆ Switching To' + `%c ${newRoomName} ` + '%cRoom...',
            'color: lightblue',
            'color: yellow',
            'color: lightblue;',
        );

        setUpdate((prevState) => !prevState);
    };

    const switchTab = (newTab: string) => {
        console.log(
            '%c◆ Changed to ' + `%c ${newTab} ` + '%ctab!',
            'color: lightblue',
            'color: orange',
            'color: lightblue;',
        );
    };

    return { selectedRoomTitle, update, currentTab, switchTab, switchRoom };
}
