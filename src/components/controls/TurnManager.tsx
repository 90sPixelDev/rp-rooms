import React, { useEffect, useState } from 'react';

import loadingAnim from '../../resources/ui/loading-anim.svg';

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
            'h-fit w-[100%] pb-2 bg-purple-300 rounded-full mt-2 flex flex-row gap-12 overflow-x-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        currentChara: 'flow-root min-w-fit min-h-fit bg-white rounded-full px-2 m-auto border-2 border-purple-400',
        characterName: 'flow-root min-w-fit min-h-fit bg-purple-100 rounded-full px-2 m-auto',
        loadingAnim: 'm-auto w-6 h-6',
    };

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

    const determineCharaNameStyle = (chara: any) => {
        if (chara[2]) {
            return (
                <p className={styles.currentChara} key={renderRandomKey(chara[1])}>
                    {chara[1]}
                </p>
            );
        } else
            return (
                <p className={styles.characterName} key={renderRandomKey(chara[1])}>
                    {chara[1]}
                </p>
            );
    };

    const sortCharaList = () => {
        const charaArr = charaList.map((chara) => [chara.turn, chara.charaName, chara.currentTurn]);
        const charaListSorted = charaArr.sort((a: any, b: any) => a[0] - b[0]);
        const charaListElem = charaListSorted.map((chara) => determineCharaNameStyle(chara));
        return charaListElem;
    };

    if (!isLoading) return <div className={styles.container}>{sortCharaList()}</div>;

    return (
        <div className={styles.container}>
            <img className={styles.loadingAnim} src={loadingAnim} />
        </div>
    );
};

export default TurnManager;
