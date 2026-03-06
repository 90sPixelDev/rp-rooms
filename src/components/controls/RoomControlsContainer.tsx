import React, { useContext } from 'react';
import { CharacterControls, RoomOptionsPeek } from '..';
import { ThemeContext } from '../../context/ThemeContext';

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
            'flex flex-col w-[95%] h-[95%] m-auto rounded-lg min-h-fit overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full ',
    };

    const theme = useContext(ThemeContext);

    return (
        <div
            className={
                styles.container +
                `bg-${theme?.themeColor}-300 scrollbar-thumb-${theme?.themeColor}-500 scrollbar-track-${theme?.themeColor}-300 hover:scrollbar-thumb-${theme?.themeColor}-400 `
            }
        >
            <CharacterControls roomTitle={props.roomTitle} isOpened={props.isOpened} />
            <RoomOptionsPeek isOpened={props.isOpened} roomTitle={props.roomTitle} />
        </div>
    );
};

export default RoomControlsContainer;
