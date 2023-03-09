import React, { useContext, useEffect, useState } from 'react';

import loadingAnim from '../../resources/ui/loading-anim.svg';
import { ThemeContext } from '../../context/ThemeContext';

type chara = {
    charaName: string;
    currentTurn: boolean;
    turn: string;
};
interface Props {
    charaMap: chara[] | null;
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
            'h-fit w-[100%] pb-2 rounded-full mt-2 flex flex-row gap-12 overflow-x-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full ',
        currentChara: 'flow-root min-w-fit min-h-fit bg-white rounded-full px-2 m-auto border-2 ',
        characterName: 'flow-root min-w-fit min-h-fit rounded-full px-2 m-auto ',
        loadingAnim: 'm-auto w-6 h-6 ',
    };

    const theme = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [charaList, setCharaList] = useState<chara[] | []>([]);

    useEffect(() => {
        setCharaList([]);
        if (props.charaMap != null && props.charaMap != undefined) {
            setCharaList(Object.values(props.charaMap).map((uid) => uid));
            setIsLoading(false);
        }
    }, [props.charaMap]);

    const renderRandomKey = (charaNameStr: string) => {
        const randomNum = Math.random() * 3;
        const key = `${charaNameStr}-${randomNum}`;
        return key;
    };

    const determineCharaNameStyle = (chara: (string | boolean)[]) => {
        if (chara[2] as boolean) {
            return (
                <p
                    className={styles.currentChara + `border-${theme?.themeColor}-400`}
                    key={renderRandomKey(chara[1] as string)}
                >
                    {chara[1]}
                </p>
            );
        } else
            return (
                <p
                    className={styles.characterName + `bg-${theme?.themeColor}-100`}
                    key={renderRandomKey(chara[1] as string)}
                >
                    {chara[1]}
                </p>
            );
    };

    const sortCharaList = () => {
        const charaArr = charaList.map((chara) => [chara.turn, chara.charaName, chara.currentTurn]);
        const charaListSorted = charaArr.sort(
            (a: (string | boolean)[], b: (string | boolean)[]) =>
                parseFloat(a[0] as string) - parseFloat(b[0] as string),
        );
        const charaListElem = charaListSorted.map((chara) => determineCharaNameStyle(chara));
        return charaListElem;
    };

    if (!isLoading) return <div className={styles.container + `bg-${theme?.themeColor}-300`}>{sortCharaList()}</div>;

    return (
        <div className={styles.container + `bg-${theme?.themeColor}-300`}>
            <img className={styles.loadingAnim} src={loadingAnim} />
        </div>
    );
};

export default TurnManager;
