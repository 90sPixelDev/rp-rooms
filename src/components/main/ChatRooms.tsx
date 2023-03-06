import React, { useState, useEffect, useContext } from 'react';

import { ChatBody, ChatInput, UserControlsContainer, LeftBar, RightBar, RoomControlsContainer } from '../exporter';
import useRooms from '../../hooks/useRooms';
import { refreshUtils } from '../../utils/refreshUtils';

import loadingAnim from '../../resources/ui/loading-anim.svg';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from '../portals/Modal';
import BaseModal from '../../modals/BaseModal';

type Styles = {
    container: string;
    loading: string;
    wrapperROpen: string;
    wrapperLOpen: string;
    wrapperBOpen: string;
    wrapperClosed: string;
    // testTheme: string;
};

const ChatRooms = () => {
    const styles: Styles = {
        container: 'flex flex-col w-full h-full',
        loading: 'w-[30%] m-auto',
        wrapperROpen:
            'h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden ',
        wrapperLOpen:
            'h-[100vh] w-[100vw] grid grid-cols-[250px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden ',
        wrapperBOpen:
            'h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden ',
        wrapperClosed:
            'h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute overflow-hidden ',
    };

    const theme = useContext(ThemeContext);

    const { data, isLoading } = useRooms();
    const { currentTab, switchTab, selectedRoomTitle, switchRoom } = refreshUtils();

    const [isRBOpened, setRBIsOpened] = useState(false);
    const [isLBOpened, setLBIsOpened] = useState(false);
    const toggleRightBar = () => {
        setRBIsOpened((prevState: boolean) => !prevState);
    };
    const toggleLeftBar = () => {
        setLBIsOpened((prevState: boolean) => !prevState);
    };

    useEffect(() => {
        if (selectedRoomTitle === '' && data !== null && data !== undefined && !isLoading) {
            switchRoom(data?.[0].id as string);
        } else switchRoom(selectedRoomTitle);
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
        <>
            <div className={sideBarRenderHandler() + `bg-${theme?.themeColor}-200`}>
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
                        currentTab={currentTab}
                        switchTab={switchTab}
                        callRefreshMessages={switchRoom}
                    />
                )}
                {selectedRoomTitle === '' && (
                    <div className={styles.container}>
                        <img className={styles.loading} src={loadingAnim} />
                    </div>
                )}
                <RightBar toggleRightBar={toggleRightBar} isOpened={isRBOpened} />
                <UserControlsContainer isOpened={isLBOpened} />
                <ChatInput roomSelectedInfo={selectedRoomTitle} currentTab={currentTab} />
                <RoomControlsContainer roomTitle={selectedRoomTitle} isOpened={isRBOpened} />
            </div>
        </>
    );
};

export default ChatRooms;
