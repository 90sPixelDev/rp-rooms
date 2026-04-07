import React, { useContext, useState } from 'react';
import { User } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { storage } from '../../firebase.config';

import { UserContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

interface Props {
    isOpened: boolean;
}
type Styles = {
    container: string;
    names: string;
    userName: string;
    userNameShort: string;
    userNameLong: string;
    userNameTooLong: string;
    userNameVeryLong: string;
    nickName: string;
    nickNameInput: string;
    charaPicContainer: string;
    charaPic: string;
    charaPicClosed: string;
    charaUpdateInput: string;
    charaPicContainerClosed: string;
};

const UserProfilePeek = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-row',
        names: 'ml-2 mt-2',
        userName: 'font-bold',
        userNameShort: 'font-bold text-lg',
        userNameLong: 'font-bold text-sm',
        userNameTooLong: 'font-bold text-xs',
        userNameVeryLong: 'font-bold text-[0.65rem]',
        nickName: 'underline cursor-pointer',
        nickNameInput: 'italic w-[140px] outline-purple-500',
        charaPicContainer:
            'flex flex-row min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-lg ml-2 mt-2 transition overflow-hidden ',
        charaPic: 'h-full w-full object-contain',
        charaPicClosed: 'h-full w-full object-contain',
        charaUpdateInput: 'absolute z-[2] opacity-0',
        charaPicContainerClosed:
            'flex flex-row min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] rounded-lg mt-2 mx-auto transition overflow-hidden items-center ',
    };

    const theme = useContext(ThemeContext);
    const currentUser = useContext(UserContext);

    const [err, setErr] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPTag, setPTag] = useState(true);

    const validateNewNickname = async (newNickname: string) => {
        if (newNickname.length < 4 || newNickname.length > 17 || !newNickname.replace(/\s/g, '').length) {
            console.warn(`%c${newNickname}`, 'color: red', ' is not a valid username! Username was not updated.');
            setPTag(true);
            return;
        } else
            await updateProfile(currentUser as User, {
                displayName: newNickname,
            });
        setPTag(true);
        console.log('Updated nickname!');
    };

    const handleEmailTextSize = () => {
        if (currentUser === null || currentUser.email === null) return styles.nickName;
        if (currentUser?.email?.length > 14) {
            return styles.userNameLong;
        } else if (currentUser?.email?.length > 18) {
            return styles.userNameTooLong;
        } else if (currentUser?.email?.length > 22) {
            return styles.userNameTooLong;
        } else {
            return styles.userNameShort;
        }
    };

    const showUserName = currentUser ? (
        <p className={handleEmailTextSize()} onClick={() => console.log(currentUser.displayName)}>
            {currentUser.email}
        </p>
    ) : (
        <p className={styles.userName}>User undefined</p>
    );

    const updateProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uid = currentUser?.uid;
        if (!uid) return;

        const file = e.currentTarget.files![0];
        const storageRef = ref(storage, `users/${uid}/avatar.jpg`);

        console.log(file);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(currentUser, {
                        photoURL: downloadURL,
                    });
                    console.log('Uploaded!');
                });
            },
        );
    };

    if (props.isOpened)
        return (
            <div className={styles.container}>
                <div className={styles.charaPicContainer + `bg-${theme?.themeColor}-700`}>
                    <img
                        className={styles.charaPic}
                        src={currentUser?.photoURL as string}
                        onError={(e) => (e.currentTarget.src = currentUser?.displayName?.slice(0) as string)}
                        alt=""
                    />
                </div>
                <div className={styles.names}>
                    {showUserName}
                    {isPTag ? (
                        <p className={styles.nickName} onClick={() => setPTag(false)}>
                            {currentUser?.displayName ?? 'Unknown Username'}
                        </p>
                    ) : (
                        <input
                            className={styles.nickNameInput}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') validateNewNickname(e.currentTarget.value);
                            }}
                            onClick={(e) => validateNewNickname(e.currentTarget.value)}
                            type="text"
                        />
                    )}
                </div>
            </div>
        );

    return (
        <div className={styles.container}>
            <div className={styles.charaPicContainerClosed + `bg-${theme?.themeColor}-700`}>
                <img
                    className={styles.charaPicClosed}
                    src={currentUser?.photoURL as string}
                    onError={(e) => (e.currentTarget.src = currentUser?.displayName?.slice(0) as string)}
                    alt=""
                />
                <input
                    className={styles.charaUpdateInput}
                    type="file"
                    name="avatar"
                    id="image-file"
                    accept="image/png,image/jpeg,image/gif"
                    onChange={(e) => {
                        updateProfilePic(e);
                    }}
                    required
                />
            </div>
        </div>
    );
};

export default UserProfilePeek;
