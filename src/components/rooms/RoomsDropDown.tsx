import React, { useState, useEffect } from 'react';
import { DropDownItem } from '../exporter';

import loadingAnim from '../../resources/ui/loading-anim.svg';

interface Props {
    roomsSearched: string[] | null;
    addSelectedRoom: (room: string) => void;
    searchingDone: boolean;
}
interface Props {
    isOpened: boolean;
}
type Styles = {
    containerOpened: string;
    containerLoadingClosed: string;
    container: string;
    body: string;
    noRoomsText: string;
    noRoomsTextOpened: string;
};

const RoomsDropDown = (props: Props) => {
    const styles: Styles = {
        containerOpened:
            'absolute bg-purple-400 flex flex-col h-fit w-full top-[70%] border-2 border-purple-300 transition',
        container: 'bg-purple-300 flex flex-col border-2 border-purple-200 transition ml-1 mr-1 rounded-b-lg',
        containerLoadingClosed:
            'fixed bg-[transparent] flex flex-col h-fit w-full top-[51%] border-2 border-purple-300 transition m-h-fit',
        body: 'flex flex-col h-full w-full transition',
        noRoomsText: 'text-center',
        noRoomsTextOpened: 'mx-auto text-center',
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roomsFound, setRoomsFound] = useState<boolean>(true);

    useEffect(() => {
        setRoomsFound(true);
        if (props.roomsSearched != null) {
            setIsLoading(false);
            if (props.roomsSearched?.length == 0) {
                setRoomsFound(false);
            }
        }
    }, [props.roomsSearched]);

    if (props.isOpened) {
        if (!roomsFound)
            return (
                <div className={styles.containerOpened}>
                    <p className={styles.noRoomsText}>No rooms found matching room name search.</p>
                </div>
            );
        if (isLoading)
            return (
                <div className={styles.containerOpened}>
                    <img src={loadingAnim} />
                </div>
            );

        return (
            <div className={styles.containerOpened}>
                {props.roomsSearched?.map((room: string) => (
                    <DropDownItem title={room} key={Math.random() * 9} addSelectedRoom={props.addSelectedRoom} />
                ))}
            </div>
        );
    }

    if (!roomsFound)
        return (
            <div className={styles.container}>
                <p className={styles.noRoomsText}>No rooms found matching search.</p>
            </div>
        );
    if (isLoading)
        return (
            <div className={styles.container}>
                <img src={loadingAnim} />
            </div>
        );
    else
        return (
            <div className={styles.container}>
                {props.roomsSearched?.map((room: string) => (
                    <DropDownItem title={room} key={Math.random() * 9} addSelectedRoom={props.addSelectedRoom} />
                ))}
            </div>
        );
};

export default RoomsDropDown;
