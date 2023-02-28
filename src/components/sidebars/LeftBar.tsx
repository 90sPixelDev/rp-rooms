import React from 'react';

import { LeftBarTop, RoomListContainer } from '../exporter';

interface Props {
    listOfRooms: string[];
    callRefreshMessages: (text: string) => void;
    toggleLeftBar: () => void;
    isOpened: boolean;
}
type Styles = {
    container: string;
};

const LeftBar = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-col gap-2 bg-purple-100',
    };

    return (
        <section className={styles.container}>
            <LeftBarTop
                callRefreshMessages={props.callRefreshMessages}
                toggleLeftBar={props.toggleLeftBar}
                isOpened={props.isOpened}
            />
            <RoomListContainer
                listOfRooms={props.listOfRooms}
                callRefreshMessages={props.callRefreshMessages}
                isOpened={props.isOpened}
            />
        </section>
    );
};

export default LeftBar;
