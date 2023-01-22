import * as React from 'react';
import { RefreshData } from './types';

export function refreshUtils(): RefreshData {
    const [selectedRoomTitle, setSelectedRoomTitle] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    const refreshMessages = (newRoomName?: string) => {
        if (newRoomName !== undefined && newRoomName.length > 0) {
            setSelectedRoomTitle(newRoomName);
        } else setSelectedRoomTitle('');

        console.log('%c◆ Refreshing Data...', 'color: lightblue');
        setUpdate((prevState: boolean) => !prevState);
    };

    return { selectedRoomTitle, update, refreshMessages };
}
