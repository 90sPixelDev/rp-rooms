import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';

import { ChatTypeButton, TurnManager, ChatSend } from '../exporter';
import { sendMessage } from '../../utils/sendMessage';

interface Props {
    roomSelectedInfo: string;
    currentTab: string;
}
type chara = {
    charaName: string;
    currentTurn: boolean;
    turn: string;
};
type Styles = {
    container: string;
    textArea: string;
    button: string;
    bttnArea: string;
    mssgArea: string;
};

const ChatInput = (props: Props) => {
    const styles: Styles = {
        container: 'overflow-hidden bg-purple-200 rounded-lg flex flex-col justify-around px-1',
        textArea:
            'h-[80%] w-[90%] resize-none sd mx-1 my-auto caret-purple-500 outline-purple-500 rounded-lg grow-0 scrollbar-thin scrollbar scrollbar-thumb-purple-600 scrollbar-track-purple-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full',
        button: 'm-1 py-1 px-2 border-2 border-purple-500 bg-purple-300 hover:bg-purple-200',
        bttnArea: 'bg-purple-200',
        mssgArea:
            'flex flex-row bg-purple-300 rounded-tr-xl rounded-tl-lg border-2 border-purple-400 min-h-[50%] h-fit',
    };

    const currentUser = React.useContext(UserContext);

    const [tempTypedMssg, setTempTypedMssg] = useState<string>('');
    const [charaMap, setCharaMap] = useState<chara[] | null>(null);

    const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const typedText = e.target.value;
        setTempTypedMssg(typedText);
    };

    const validateKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter' && e.shiftKey) {
            return;
        } else if (e.code === 'Enter' && !e.shiftKey) {
            await sendMessage(tempTypedMssg, props.roomSelectedInfo, props.currentTab, currentUser);
            setTempTypedMssg('');
        }
    };

    const GetCharas = useCallback(async () => {
        const roomRef = doc(db, 'rooms', props.roomSelectedInfo);
        const roomDoc = await getDoc(roomRef);

        setCharaMap(roomDoc.data()?.characters);
    }, [props.roomSelectedInfo]);

    useEffect(() => {
        if (props.roomSelectedInfo != null && props.roomSelectedInfo != undefined && props.roomSelectedInfo != '') {
            GetCharas();
        }
    }, [props.roomSelectedInfo]);

    return (
        <div className={styles.container}>
            <div className={styles.bttnArea}>
                <TurnManager charaMap={charaMap} />
                <ChatTypeButton />
            </div>
            <div className={styles.mssgArea}>
                <textarea
                    className={styles.textArea}
                    onChange={(e) => updateText(e)}
                    onKeyDown={(e) => validateKeyPress(e)}
                    value={tempTypedMssg}
                />
                <ChatSend sendMssg={() => console.log('lol')} />
            </div>
        </div>
    );
};

export default ChatInput;
