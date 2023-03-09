import React, { useContext } from 'react';

import { LeftBarTop, RoomListContainer } from '../exporter';
import { ThemeContext } from '../../context/ThemeContext';

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
        container: 'flex flex-col gap-2 ',
    };

    const theme = useContext(ThemeContext);

    return (
        <section className={styles.container + `bg-${theme?.themeColor}-100`}>
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
