import React, { useState, useEffect, useContext } from 'react';
import RoomContainer from './RoomContainer';

import loadingAnim from '../../resources/ui/loading-anim.svg';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    listOfRooms: string[];
    callRefreshMessages: (text: string) => void;
    isOpened: boolean;
}
type Styles = {
    container: string;
};

const RoomListContainer = (props: Props) => {
    const styles: Styles = {
        container:
            'rounded-tr-lg overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-full transition ',
    };

    const theme = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [highlightedRoom, setHighLightedRoom] = useState('');

    const roomSelectionHandler = (selection: string) => {
        setHighLightedRoom(selection);
        props.callRefreshMessages(selection);
    };

    useEffect(() => {
        if (props.listOfRooms && highlightedRoom === '') {
            setHighLightedRoom(props.listOfRooms[0]);
            setIsLoading(false);
        }
    }, [, props.listOfRooms]);

    return (
        <div className={styles.container + `bg-${theme?.themeColor}-200`}>
            {isLoading ? (
                <img src={loadingAnim} />
            ) : (
                props.listOfRooms.map((room: any) => (
                    <RoomContainer
                        key={Math.random() * 9}
                        title={room}
                        highlightedRoom={highlightedRoom}
                        roomChanged={roomSelectionHandler}
                        isOpened={props.isOpened}
                    />
                ))
            )}
        </div>
    );
};

export default RoomListContainer;
