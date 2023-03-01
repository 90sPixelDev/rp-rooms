import React from 'react';
import { CharacterControls, RoomOptionsPeek } from '../exporter';

interface Props {
    roomTitle: string;
    isOpened: boolean;
}
type Styles = {
    container: string;
};

const RoomControlsContainer = (props: Props) => {
    const styles: Styles = {
        container:
            'flex flex-col bg-purple-300 w-[95%] h-[95%] m-auto rounded-lg min-h-fit overflow-y-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
    };

    return (
        <div className={styles.container}>
            <CharacterControls roomTitle={props.roomTitle} isOpened={props.isOpened} />
            <RoomOptionsPeek isOpened={props.isOpened} roomTitle={props.roomTitle} />
        </div>
    );
};

export default RoomControlsContainer;
