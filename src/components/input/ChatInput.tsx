import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';

import useCharaCount from '../../hooks/useCharaCount';
import useGetData from '../../hooks/useGetData';

import { ChatTypeButton, TurnManager, ChatSend } from '..';
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
        mssgArea: 'flex flex-row rounded-tr-xl rounded-tl-lg border-2 min-h-[10%] h-[100%] ',
    };

    const theme = React.useContext(ThemeContext);
    const currentUser = React.useContext(UserContext);

    const { getUpdatedCharaCount, charaCount } = useCharaCount(props.roomSelectedInfo);
    const { userRoomsData } = useGetData();

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
        return false;
    };

    const sortCharactersByTurn = () => {
        if (currentUser == null || charaMap == null || turnNum == null) return;

        const charaArrySorted = Object.entries(charaMap).map((chara) => chara);

        charaArrySorted.sort((a, b) => {
            return (a[1].turn as number) - (b[1].turn as number);
        });

        // if current chara's turn is not 0 (first) we will need to reorder the chara turn array by putting in front who's current turn it is
        for (let i = 0; i < charaArrySorted.length; i++) {
            if (charaArrySorted[i][1].turn === turnNum) {
                const amtToRmv = i;
                const rmvItms = charaArrySorted.splice(0, amtToRmv);
                rmvItms.forEach((itm) => {
                    charaArrySorted.push(itm);
                });
            }
        }

        return charaArrySorted;
    };

    const placeHolderText = () => {
        if (currentUser == null || charaMap == null) return;
        type Chara = keyof typeof charaMap;
        const uid = currentUser.uid as Chara;
        const userChara = charaMap[uid];

        const sortedCharaListByTurn = sortCharactersByTurn();
        let numOfTurnsAway = -1;

        if (sortedCharaListByTurn != undefined && sortedCharaListByTurn != null) {
            // Calculates the turns left from user to current chara's turn by the difference in the index between current turn (0) and user -> sortedCharaListByTurn[i][1].turn
            for (let i = 0; i < sortedCharaListByTurn.length; i++) {
                if (sortedCharaListByTurn[i][1].turn === (userChara as CharaInfo).turn) numOfTurnsAway = i;
            }
        }

        if (checkCharacters() && numOfTurnsAway === 1)
            return 'It is not your turn yet in the story.\n-> You are the next turn.';
        else if (checkCharacters() && numOfTurnsAway > 0)
            return `It is not your turn yet in the story.\n-> ${numOfTurnsAway} turns left.`;
        else return '';
    };

    useEffect(() => {
        if (props.roomSelectedInfo != null && props.roomSelectedInfo != undefined && props.roomSelectedInfo != '') {
            GetCharasAndTurn();
        }
    }, [props.roomSelectedInfo, userRoomsData, charaCount]);

    return (
        <div className={styles.container + `bg-${theme?.themeColor}-200`}>
            <div className={styles.bttnArea + `bg-${theme?.themeColor}-200`}>
                <TurnManager charaMap={charaMap} turnNum={turnNum as number} charaCount={charaCount} />
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
