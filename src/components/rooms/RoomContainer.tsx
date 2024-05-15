import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '..';
import { ThemeContext } from '../../context/ThemeContext';

type Styles = {
    roomParent: string;
};
interface Props {
    title: string;
    highlightedRoom: string;
    roomChanged: (room: string) => void;
    isOpened: boolean;
}

const RoomContainer = (props: Props) => {
    const styles: Styles = {
        roomParent: 'rounded-r-full flex flex-col mx-auto ',
    };

    const theme = useContext(ThemeContext);

    const [selectedRoomTitle, setSelectedRoomTitle] = useState<string | null>();

    const selectRoom = () => {
        props.roomChanged(props.title);
    };

    const cleanRoomTitle = () => {
        return props.title.replace(/\s+/g, '-');
    };

    if (selectedRoomTitle === null || selectedRoomTitle === undefined || selectedRoomTitle == '') {
        setSelectedRoomTitle(props.highlightedRoom);
    }

    return (
        <>
            {selectedRoomTitle && (
                <div className={styles.roomParent + `bg-${theme?.themeColor}-200`} onClick={selectRoom}>
                    <Room selected={props.title === selectedRoomTitle ? true : false} title={props.title} />
                </div>
            )}
            {!selectedRoomTitle && <p>Selected Room Loading!</p>}
        </>
    );
};

export default RoomContainer;
