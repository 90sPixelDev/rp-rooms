import * as React from 'react';
import { RefreshData } from './types';

export function refresh(): RefreshData {
    const [selectedRoomTitle, setSelectedRoomTitle] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    const refreshMessages = (newRoomName: string) => {
        setSelectedRoomTitle(newRoomName);

        setUpdate((prevState: boolean) => !prevState);
    };

    return { selectedRoomTitle, update, refreshMessages };
}
