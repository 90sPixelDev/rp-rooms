import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';

import { ChatTypeButton, TurnManager, ChatSend } from '../exporter';
import { sendMessage } from '../../utils/sendMessage';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    roomSelectedInfo: string;
    currentTab: string;
}

type CharaInfo = {
    charaName: string;
    charaPic: string;
    currentTurn: boolean;
    turn: number;
};

const ChatInput = (props: Props) => {
    const styles = {
        container: 'rounded-lg flex flex-col justify-around px-1 min-w-0 ',
        textArea:
            'h-[90%] w-[90%] resize-none sd mx-1 my-auto rounded-lg grow-0 scrollbar-thin scrollbar scrollbar-thumb-purple-600 scrollbar-track-purple-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full p-1 ',
        bttnArea: 'w-[100%] mx-auto ',
        mssgArea: 'flex flex-row rounded-tr-xl rounded-tl-lg border-2 min-h-[50%] h-fit ',
    };

    const theme = React.useContext(ThemeContext);
    const currentUser = React.useContext(UserContext);

    const [turnNum, setTurnNum] = useState<number | null>(null);
    const [charaMap, setCharaMap] = useState<CharaInfo[] | null>(null);
    const [tempTypedMssg, setTempTypedMssg] = useState<string>('');

    const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const typedText = e.target.value;
        setTempTypedMssg(typedText);
    };

    const validateKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter' && e.shiftKey) {
            return;
        } else if (e.code === 'Enter' && !e.shiftKey) {
            SubmitMessage();
        }
    };

    const SubmitMessage = async () => {
        await sendMessage(tempTypedMssg, props.roomSelectedInfo, props.currentTab, currentUser);
        setTempTypedMssg('');
    };

    const GetCharasAndTurn = useCallback(async () => {
        const roomRef = doc(db, 'rooms', props.roomSelectedInfo);
        const roomDoc = await getDoc(roomRef);

        setCharaMap(roomDoc.data()?.characters);
        setTurnNum(roomDoc.data()?.currentTurn);
    }, [props.roomSelectedInfo]);

    const checkCharacters = () => {
        if (currentUser !== null && charaMap !== null) {
            type Chara = keyof typeof charaMap;
            const uid = currentUser.uid as Chara;

            const chara = charaMap[uid];

            if (!(chara as CharaInfo).currentTurn && props.currentTab === 'story') return true;
            else return false;
        }
        return true;
    };

    const placeHolderText = () => {
        if (currentUser == null || charaMap == null) return;
        type Chara = keyof typeof charaMap;
        const uid = currentUser.uid as Chara;

        const chara = charaMap[uid];
        let currentTurnChara: CharaInfo = {
            charaName: '',
            charaPic: '',
            currentTurn: false,
            turn: -1,
        };

        let numOfTurnsAway = 0;

        for (const val of Object.values(charaMap)) {
            if (val.turn === turnNum) {
                currentTurnChara = val;
            }
        }

        const numChara = (chara as CharaInfo).turn;

        if (numChara < currentTurnChara.turn) {
            const top = Object.keys(charaMap).length - currentTurnChara.turn;
            console.log(top);
            numOfTurnsAway = top + numChara;
            console.log(numOfTurnsAway);
        } else if (numChara > currentTurnChara.turn) {
            const top = Object.keys(charaMap).length - numChara;
            console.log(top);
            numOfTurnsAway = top + currentTurnChara.turn;
        }

        if (checkCharacters() && numOfTurnsAway === 0)
            return 'It is not your turn yet in the story.\n-> You are the next turn.';
        else if (checkCharacters() && numOfTurnsAway !== 0)
            return `It is not your turn yet in the story.\n-> ${numOfTurnsAway} turns left.`;
        else return '';
    };

    useEffect(() => {
        if (props.roomSelectedInfo != null && props.roomSelectedInfo != undefined && props.roomSelectedInfo != '') {
            GetCharasAndTurn();
        }
    }, [props.roomSelectedInfo]);

    return (
        <div className={styles.container + `bg-${theme?.themeColor}-200`}>
            <div className={styles.bttnArea + `bg-${theme?.themeColor}-200`}>
                <TurnManager charaMap={charaMap} turnNum={turnNum as number} />
                <ChatTypeButton />
            </div>
            <div className={styles.mssgArea + `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-400 `}>
                <textarea
                    className={styles.textArea + `caret-${theme?.themeColor}-500 outline-${theme?.themeColor}-500`}
                    name="Message Input"
                    maxLength={300}
                    placeholder={placeHolderText()}
                    onChange={(e) => updateText(e)}
                    onKeyDown={(e) => validateKeyPress(e)}
                    value={tempTypedMssg}
                    disabled={checkCharacters()}
                />
                <ChatSend sendMssg={SubmitMessage} disabled={checkCharacters()} />
            </div>
        </div>
    );
};

export default ChatInput;
