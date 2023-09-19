import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { doc, updateDoc, arrayRemove, deleteDoc, getDoc, deleteField } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';

import { refreshUtils } from '../../utils/refreshUtils';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    roomTitle: string;
    isOpened: boolean;
}
type Styles = {
    container: string;
    topArea: string;
    roomText: string;
    btnContainer: string;
    dangerZone: string;
    dangerZoneText: string;
    leaveRmBtn: string;
    deleteRmBtn: string;
    doorOpenIcon: string;
    roomOptionsBtn: string;
    roomOpText: string;
};

const RoomOptionsPeek = (props: Props) => {
    const styles: Styles = {
        container: 'm-1 p-1 rounded-lg items-center flex flex-col ',
        topArea: 'flex flex-row items-center justify-around w-full ',
        roomText: 'text-center font-bold',
        btnContainer: 'flex justify-evenly',
        dangerZone: 'flex flex-col rounded-lg w-full',
        dangerZoneText: 'text-center',
        deleteRmBtn: 'bg-red-500 p-1 rounded-lg w-fit text-sm hover:bg-red-400',
        leaveRmBtn: 'hover:bg-red-200 p-1 rounded-lg bg-red-300 w-fit text-sm',
        doorOpenIcon: 'm-auto',
        roomOptionsBtn: 'rounded-lg p-1 w-fit ',
        roomOpText: 'text-sm m-1',
    };

    const theme = useContext(ThemeContext);
    const currentUser = useContext(UserContext);

    const { switchRoom } = refreshUtils();

    const doorOpenIcon = <FontAwesomeIcon icon={solid('door-open')} />;
    const trashcanIcon = <FontAwesomeIcon icon={solid('trash-can')} />;
    const roomOptionsIcon = <FontAwesomeIcon icon={solid('outdent')} />;

    const fieldToDelete = `characters.${currentUser?.uid}`;

    const leaveRoom = async () => {
        const roomDoc = doc(db, 'rooms', props.roomTitle);
        await updateDoc(roomDoc, {
            user: arrayRemove(`${currentUser?.uid}`),
            [fieldToDelete]: deleteField(),
        });
    };

    const deleteRoom = async () => {
        const roomDoc = doc(db, 'rooms', props.roomTitle);
        const roomDocSnap = await getDoc(roomDoc);
        const owner = roomDocSnap.data()?.owner.toString();
        if (owner === currentUser?.uid) {
            await deleteDoc(roomDoc);
            switchRoom('');
        } else {
            console.warn('You Do Not Have Authorization To Delete This Room.');
        }
    };

    if (props.isOpened)
        return (
            <div className={styles.container + `bg-${theme?.themeColor}-400`}>
                <div className={styles.topArea}>
                    <p className={styles.roomText}>Room:</p>
                    <button
                        className={
                            styles.roomOptionsBtn + `bg-${theme?.themeColor}-500 hover:text-${theme?.themeColor}-200`
                        }
                    >
                        {roomOptionsIcon}Room Options
                    </button>
                </div>
                <div className={styles.dangerZone}>
                    <p className={styles.dangerZoneText}>Danger Zone:</p>
                    <div className={styles.btnContainer}>
                        <button className={styles.leaveRmBtn} onClick={leaveRoom}>
                            {doorOpenIcon}Leave Room
                        </button>
                        <button className={styles.deleteRmBtn} onClick={deleteRoom}>
                            {trashcanIcon}Delete Room
                        </button>
                    </div>
                </div>
            </div>
        );

    return <></>;
};

export default RoomOptionsPeek;
