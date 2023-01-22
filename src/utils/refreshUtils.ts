import * as React from 'react';
import { RefreshData } from './types';

export function refreshUtils(): RefreshData {
    const [selectedRoomTitle, setSelectedRoomTitle] = React.useState('');
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

    return { selectedRoomTitle, update, switchRoom };
}
