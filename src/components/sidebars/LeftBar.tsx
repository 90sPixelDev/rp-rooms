import React, { Fragment, useContext } from 'react';

import { LeftBarTop, RoomListContainer } from '..';
import { ThemeContext } from '../../context/ThemeContext';
import { Transition } from '@headlessui/react';

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
        <Transition
            show={true}
            as={Fragment}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
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
        </Transition>
    );
};

export default LeftBar;
