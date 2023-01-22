import React, { useState, useEffect } from 'react';

import { ChatBody, ChatInput, UserControlsContainer, LeftBar, RightBar, RoomControlsContainer } from '../exporter';
import useRooms from '../../hooks/useRooms';
import { refresh } from '../../utils/update';

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
    const styles = {
        wrapperROpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperLOpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[250px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperBOpen:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
        wrapperClosed:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden',
    };

    const [isRBOpened, setRBIsOpened] = useState(false);
    const [isLBOpened, setLBIsOpened] = useState(false);
    const [currentTab, setCurrentTab] = useState('chat');

    const { rooms, loading, fetchUserRoomsData, unsubscribe } = useRooms();
    const { selectedRoomTitle, update, refreshMessages } = refresh();

    const changeTab = (tab: string) => {
        setCurrentTab(tab);
    };

    const loadRooms = async () => {
        await fetchUserRoomsData();
    };

    const toggleRightBar = () => {
        setRBIsOpened((prevState: boolean) => !prevState);
    };
    const toggleLeftBar = () => {
        setLBIsOpened((prevState: boolean) => !prevState);
    };

    useEffect(() => {
        const unSub = () => {
            if (rooms === null && loading) {
                loadRooms();
            }
            if (
                rooms != undefined &&
                rooms != null &&
                (selectedRoomTitle === null || selectedRoomTitle === undefined || selectedRoomTitle === '')
            ) {
                refreshMessages(rooms[0]);
            }
        };

        return unSub;
    }, [currentTab, loading, unsubscribe, update]);

    const renderSideBarsConditionally = () => {
        switch (true) {
            case isLBOpened && isRBOpened:
                return (
                    <div className={styles.wrapperBOpen}>
                        <LeftBar
                            listOfRooms={rooms as string[]}
                            callRefreshMessages={refreshMessages}
                            toggleLeftBar={toggleLeftBar}
                            isOpened={isLBOpened}
                        />
                        <ChatBody
                            roomTitle={selectedRoomTitle}
                            refresh={update}
                            currentTab={currentTab}
                            changeTab={changeTab}
                        />
                        <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
                        <UserControlsContainer isOpened={isLBOpened} />
                        <ChatInput
                            roomSelectedInfo={selectedRoomTitle}
                            callRefreshMessages={refreshMessages}
                            currentTab={currentTab}
                        />
                        <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
                    </div>
                );
            case !isLBOpened && !isRBOpened:
                return (
                    <div className={styles.wrapperClosed}>
                        <LeftBar
                            listOfRooms={rooms as string[]}
                            callRefreshMessages={refreshMessages}
                            toggleLeftBar={toggleLeftBar}
                            isOpened={isLBOpened}
                        />
                        <ChatBody
                            roomTitle={selectedRoomTitle}
                            refresh={update}
                            currentTab={currentTab}
                            changeTab={changeTab}
                        />
                        <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
                        <UserControlsContainer isOpened={isLBOpened} />
                        <ChatInput
                            roomSelectedInfo={selectedRoomTitle}
                            callRefreshMessages={refreshMessages}
                            currentTab={currentTab}
                        />
                        <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
                    </div>
                );
            case !isLBOpened && isRBOpened:
                return (
                    <div className={styles.wrapperROpen}>
                        <LeftBar
                            listOfRooms={rooms as string[]}
                            callRefreshMessages={refreshMessages}
                            toggleLeftBar={toggleLeftBar}
                            isOpened={isLBOpened}
                        />
                        <ChatBody
                            roomTitle={selectedRoomTitle}
                            refresh={update}
                            currentTab={currentTab}
                            changeTab={changeTab}
                        />
                        <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
                        <UserControlsContainer isOpened={isLBOpened} />
                        <ChatInput
                            roomSelectedInfo={selectedRoomTitle}
                            callRefreshMessages={refreshMessages}
                            currentTab={currentTab}
                        />
                        <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
                    </div>
                );
            case isLBOpened && !isRBOpened:
                return (
                    <div className={styles.wrapperLOpen}>
                        <LeftBar
                            listOfRooms={rooms as string[]}
                            callRefreshMessages={refreshMessages}
                            toggleLeftBar={toggleLeftBar}
                            isOpened={isLBOpened}
                        />
                        <ChatBody
                            roomTitle={selectedRoomTitle}
                            refresh={update}
                            currentTab={currentTab}
                            changeTab={changeTab}
                        />
                        <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
                        <UserControlsContainer isOpened={isLBOpened} />
                        <ChatInput
                            roomSelectedInfo={selectedRoomTitle}
                            callRefreshMessages={refreshMessages}
                            currentTab={currentTab}
                        />
                        <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
                    </div>
                );
            default:
                return <p>FATAL ERROR!</p>;
        }
    };

    // return <></>;

    return <>{renderSideBarsConditionally()}</>;
};

export default ChatRooms;
