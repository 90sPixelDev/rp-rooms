import React, { useContext, useEffect, useState } from 'react';

import loadingAnim from '../../resources/ui/loading-anim.svg';
import { ThemeContext } from '../../context/ThemeContext';

type chara = [charaName: string, turn: number];

type CharaInfo = {
    charaName: string;
    charaPic: string;
    currentTurn: boolean;
    turn: number;
};

interface Props {
    charaMap: CharaInfo[] | null;
    turnNum: number;
    charaCount: number;
}
type Styles = {
    container: string;
    currentChara: string;
    characterName: string;
    loadingAnim: string;
};

const TurnManager = (props: Props) => {
    const styles: Styles = {
        container:
            'max-h-[35px] p-1 rounded-full mx-auto overflow-x-scroll flex-row flex scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full ',
        currentChara: 'flow-root min-w-fit min-h-fit bg-white rounded-full px-2 mx-2 border-2 ',
        characterName: 'flow-root min-w-fit min-h-fit rounded-full px-2 mx-2 border-2 ',
        loadingAnim: 'm-auto min-w-fit min-h-fit ',
    };

    const theme = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [charaList, setCharaList] = useState<chara[] | []>([]);

    useEffect(() => {
        setCharaList([]);
        if (props.charaMap != null && props.charaMap != undefined) {
            setCharaList(Object.values(props.charaMap).map((uid) => [uid.charaName, uid.turn]));
            setIsLoading(false);
        }
    }, [props.charaMap]);

    const renderRandomKey = (charaNameStr?: string) => {
        const randomNum = Math.random() * 3;
        const key = `${charaNameStr}-${randomNum}`;
        return key;
    };

    const determineCharaNameStyle = (chara: chara) => {
        if (chara[1] === props.turnNum) {
            return (
                <p
                    className={styles.currentChara + `border-${theme?.themeColor}-400 `}
                    key={renderRandomKey(chara[0] as string)}
                >
                    {chara[0]}
                </p>
            );
        } else
            return (
                <p
                    className={styles.characterName + `border-${theme?.themeColor}-300 bg-${theme?.themeColor}-100 `}
                    key={renderRandomKey(chara[0] as string)}
                >
                    {chara[0]}
                </p>
            );
    };

    // Sort the character names in character bar to indicate who's turn is it currently and order of turns for each character.
    const sortCharaList = () => {
        const charaArr = charaList.map((char) => [char[0], char[1]]);
        const charaListSorted = charaArr.sort((a, b) => {
            return (a[1] as number) - (b[1] as number);
        });

        // if current chara's turn is not 0 (first) we will need to reorder the chara turn array by putting in front who's current turn it is
        if (charaList[0][1] != 0) {
            for (let i = 0; i < charaArr.length; i++) {
                if (charaListSorted[i][1] === props.turnNum) {
                    const amtToRmv = i;
                    const rmvItms = charaListSorted.splice(0, amtToRmv);
                    rmvItms.forEach((itm) => {
                        charaListSorted.push(itm);
                    });
                }
            }
        }

        const charaListElem = charaListSorted.map((chara) => determineCharaNameStyle(chara as chara));
        return charaListElem;
    };

    if (!isLoading)
        return (
            <div
                className={
                    styles.container +
                    `bg-${theme?.themeColor}-300 scrollbar-thumb-${theme?.themeColor}-500 scrollbar-track-${theme?.themeColor}-300 hover:scrollbar-thumb-${theme?.themeColor}-400`
                }
            >
                {sortCharaList()}
            </div>
        );

    return (
        <div className={styles.container + `bg-${theme?.themeColor}-300`}>
            <img className={styles.loadingAnim} src={loadingAnim} />
        </div>
    );
};

export default TurnManager;
