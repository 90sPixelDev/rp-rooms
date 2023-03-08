import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, list, StorageReference } from 'firebase/storage';
import { db, storage, auth } from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    roomTitle: string;
    isOpened: boolean;
}
interface Character {
    charaName: string;
    charaPic: string;
}
type Styles = {
    container: string;
    controlTitle: string;
    nameArea: string;
    nickName: string;
    nickNameInput: string;
    picArea: string;
    inputPic: string;
    charaPicContainerClosed: string;
    charaPicContainer: string;
    charaPic: string;
    charaProfileBtn: string;
};

const CharacterControls = (props: Props) => {
    const styles: Styles = {
        container: 'm-1 p-1 rounded-lg ',
        controlTitle: 'font-bold text-center',
        nameArea: 'flex flex-row',
        nickName: 'underline cursor-pointer ml-1 ',
        nickNameInput: 'italic w-[140px] ml-1 ',
        picArea: 'flex flex-row justify-evenly',
        inputPic: 'absolute z-[-1] opacity-0 h-0 w-0',
        charaPicContainer: 'h-[50px] w-[50px] rounded-lg flex ',
        charaPicContainerClosed: 'h-[35px] w-[35px] rounded-lg mx-auto mt-2 flex ',
        charaPic: 'bg-purple-600 h-fill w-fill rounded-lg m-auto',
        charaProfileBtn: 'hover:text-purple-600 bg-purple-300 p-1 rounded-lg cursor-pointer text-sm h-fit my-auto',
    };

    const theme = useContext(ThemeContext);
    const currentUser = useContext(UserContext);

    const uid = currentUser?.uid;

    const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [isPTag, setPTag] = useState(true);

    const validateNickname = async (newNickname: string) => {
        if (newNickname !== ' ' && newNickname.length > 3 && newNickname.length < 17) {
            await updateDoc(doc(db, 'rooms', props.roomTitle), {
                [`characters.${currentUser?.uid}.charaName`]: newNickname,
            });
            setPTag(true);
            setRefresh((prevState) => !prevState);
        } else {
            console.log(`%c${newNickname}`, 'color: red', ' is not valid!');
            setPTag(true);
        }
    };

    const getCharaData = async () => {
        const roomRef = doc(db, 'rooms', props.roomTitle);
        const charaRef = await getDoc(roomRef);
        if (charaRef.data()?.characters !== undefined || charaRef.data()?.characters !== null) {
            setCharacterInfo(charaRef.data()?.characters[uid as string]);
        }

        const storageRef = ref(storage, `users/${uid}/${props.roomTitle}`);
        list(storageRef)
            .then((res) => {
                if (res.items.length > 0) {
                    getDownloadURL(res.items[0])
                        .then((url) => {
                            updateDoc(doc(db, 'rooms', props.roomTitle), {
                                [`characters.${currentUser?.uid}.charaPic`]: url,
                            });
                        })
                        .catch((error) => {
                            switch (error.code) {
                                case 'storage/object-not-found':
                                    setDefaultCharaPic();
                                    break;
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    // Unknown error occurred, inspect the server response
                                    break;
                            }
                        });
                }
                if (res.items.length <= 0) {
                    setDefaultCharaPic();
                }
            })
            .catch((error) => {
                console.log(`%c ${error} - ERROR `, 'background-color: red; color: yellow;');
            });
    };

    useEffect(() => {
        if (props.roomTitle !== null && props.roomTitle !== undefined && props.roomTitle !== '') {
            getCharaData();
        }
    }, [props.roomTitle, refresh]);

    useEffect(() => {
        if (characterInfo !== null && characterInfo !== undefined) {
            setIsLoading(false);
        }
    }, [characterInfo]);

    if (isLoading) {
        <div className={styles.container + `bg${theme?.themeColor}-400`}>
            <p className={styles.controlTitle}>Character Info:</p>
        </div>;
    }

    const setDefaultCharaPic = async () => {
        const defaultCharaPic = ref(storage, 'resources/defaultCharaPic.jpg');
        getDownloadURL(defaultCharaPic)
            .then((url) => {
                updateDoc(doc(db, 'rooms', props.roomTitle), {
                    [`characters.${currentUser?.uid}.charaPic`]: url,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateCharaPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const storageRef = ref(storage, `users/${uid}/${props.roomTitle}/CharacterPic`);

        if (e.currentTarget.files![0] == null || e.currentTarget.files![0] == undefined) {
            setDefaultCharaPic();
        } else {
            const file = e.currentTarget.files![0];
            await uploadBytesResumable(storageRef, file);
            setRefresh((prevState) => !prevState);
        }
    };

    if (props.isOpened)
        return (
            <div className={styles.container + `bg-${theme?.themeColor}-400`}>
                <p className={styles.controlTitle}>Character Info:</p>
                <div className={styles.nameArea}>
                    <p>Name:</p>
                    {isPTag ? (
                        <p
                            className={styles.nickName + `hover:text-${theme?.themeColor}-600`}
                            onClick={() => setPTag(false)}
                        >
                            {characterInfo?.charaName}
                        </p>
                    ) : (
                        <input
                            className={styles.nickNameInput + `outline-${theme?.themeColor}-500`}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') validateNickname(e.currentTarget.value);
                            }}
                            onClick={(e) => validateNickname(e.currentTarget.value)}
                            type="text"
                        />
                    )}
                </div>
                <div className={styles.picArea}>
                    <label htmlFor="image-file" className={styles.charaProfileBtn}>
                        <FontAwesomeIcon icon={solid('image-portrait')} />
                        Set Profile Picture
                    </label>
                    <input
                        className={styles.inputPic}
                        type="file"
                        name="avatar"
                        id="image-file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={(e) => updateCharaPic(e)}
                    />
                    <div className={styles.charaPicContainer + `bg-${theme?.themeColor}-600`}>
                        <img className={styles.charaPic} src={characterInfo?.charaPic} />
                    </div>
                </div>
            </div>
        );

    return (
        <div className={styles.charaPicContainerClosed + `bg-${theme?.themeColor}-600`}>
            <img className={styles.charaPic} src={characterInfo?.charaPic} />
        </div>
    );
};

export default CharacterControls;
