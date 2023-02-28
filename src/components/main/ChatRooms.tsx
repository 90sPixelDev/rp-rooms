import React, { useState, useEffect } from 'react';

import { ChatBody, ChatInput, UserControlsContainer, LeftBar, RightBar, RoomControlsContainer } from '../exporter';
import useRooms from '../../hooks/useRooms';
import { refreshUtils } from '../../utils/refreshUtils';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

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

    const [currentRoomInfo, setCurrentRoomInfo] = useState<DocumentData | null>(null);
    const [isRBOpened, setRBIsOpened] = useState(false);
    const [isLBOpened, setLBIsOpened] = useState(false);
    const [currentTab, setCurrentTab] = React.useState('chat');

    const { selectedRoomTitle, switchRoom } = refreshUtils();
    const { data, isLoading } = useRooms();

    const switchTab = (newTab: string) => {
        console.log(
            '%c◆ Changed to ' + `%c ${newTab} ` + '%ctab!',
            'color: lightblue',
            'color: orange',
            'color: lightblue;',
        );
        setCurrentTab(newTab);
    };

    const GetRoomData = async () => {
        if (data === null || data === undefined) return;
        const res = data.find((room) => room.id === selectedRoomTitle);

        setCurrentRoomInfo(res?.data() as DocumentData);
    };

    const toggleRightBar = () => {
        setRBIsOpened((prevState: boolean) => !prevState);
    };
    const toggleLeftBar = () => {
        setLBIsOpened((prevState: boolean) => !prevState);
    };

    useEffect(() => {
        if (data !== null && data !== undefined) {
            GetRoomData();

            if (selectedRoomTitle === '') {
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
                listOfRooms={data?.map((room) => room.id) as string[]}
                callRefreshMessages={switchRoom}
                toggleLeftBar={toggleLeftBar}
                isOpened={isLBOpened}
            />
            {selectedRoomTitle !== '' && (
                <ChatBody
                    dataLoading={isLoading}
                    roomTitle={selectedRoomTitle}
                    currentRoomInfo={currentRoomInfo as DocumentData}
                    currentTab={currentTab}
                    switchTab={switchTab}
                />
            )}
            {/* {selectedRoomTitle === '' && (
                <div>
                    <p>LOADING</p>
                </div>
            )} */}
            <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
            <UserControlsContainer isOpened={isLBOpened} />
            <ChatInput roomSelectedInfo={selectedRoomTitle} currentTab={currentTab} />
            <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
        </div>
    );
};

export default ChatRooms;
