import React, { useState, useEffect } from 'react';

import { ChatBody, ChatInput, UserControlsContainer, LeftBar, RightBar, RoomControlsContainer } from '../exporter';
import useRooms from '../../hooks/useRooms';
import { refreshUtils } from '../../utils/refreshUtils';

interface MessageInfo {
    userName: string;
    message: string;
    uid: string;
    timeSent: string;
    email: string;
}
type InitialMssgInfo = {
    message: string;
};
type Styles = {
    wrapperROpen: string;
    wrapperLOpen: string;
    wrapperBOpen: string;
    wrapperClosed: string;
};

const ChatRooms = () => {
    const styles: Styles = {
        wrapperROpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperLOpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[250px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperBOpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperClosed:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
    };

    const [rooms, setRooms] = useState<string[] | null>(null);
    const [isRBOpened, setRBIsOpened] = useState(false);
    const [isLBOpened, setLBIsOpened] = useState(false);
    const [currentTab, setCurrentTab] = useState('chat');

    const { data, isLoading } = useRooms();
    const { selectedRoomTitle, update, switchRoom } = refreshUtils();

    const changeTab = (tab: string) => {
        setCurrentTab(tab);
    };

    const loadRooms = async () => {
        if (data === null) return;
        setRooms(data.map((doc) => doc.id));
    };

    const toggleRightBar = () => {
        setRBIsOpened((prevState: boolean) => !prevState);
    };
    const toggleLeftBar = () => {
        setLBIsOpened((prevState: boolean) => !prevState);
    };

    useEffect(() => {
        if (data !== null && data !== undefined) {
            loadRooms();

            if (selectedRoomTitle == '') {
                switchRoom(data?.[0].id as string);
            } else switchRoom(selectedRoomTitle);
        }
    }, [data, isLoading]);

    const sideBarRenderHandler = () => {
        switch (true) {
            case isLBOpened && isRBOpened:
                return styles.wrapperBOpen;
            case !isLBOpened && !isRBOpened:
                return styles.wrapperClosed;
            case !isLBOpened && isRBOpened:
                return styles.wrapperROpen;
            case isLBOpened && !isRBOpened:
                return styles.wrapperLOpen;
            default:
                return styles.wrapperBOpen;
        }
    };

    return (
        <div className={sideBarRenderHandler()}>
            <LeftBar
                listOfRooms={rooms as string[]}
                callRefreshMessages={switchRoom}
                toggleLeftBar={toggleLeftBar}
                isOpened={isLBOpened}
            />
            <ChatBody roomTitle={selectedRoomTitle} refresh={update} currentTab={currentTab} changeTab={changeTab} />
            <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
            <UserControlsContainer isOpened={isLBOpened} />
            <ChatInput roomSelectedInfo={selectedRoomTitle} callRefreshMessages={switchRoom} currentTab={currentTab} />
            <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
        </div>
    );
};

export default ChatRooms;
