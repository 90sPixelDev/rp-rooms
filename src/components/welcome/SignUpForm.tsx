import React, { useState, useEffect, useReducer } from 'react';
import { UserContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { doc, setDoc, arrayUnion, collection, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase.config';
import { SignUpBtn } from '../exporter';
import { useNavigate, Link } from 'react-router-dom';

type Props = any;
type Styles = {
    body: string;
    container: string;
    title: string;
    formContainer: string;
    userInput: string;
    emailInput: string;
    passInput: string;
    text: string;
    textLink: string;
    errMssg: string;
    passSection: string;
    eyeIconShow: string;
    eyeIconHide: string;
    signUpPic: string;
    icon: string;
    profileBtn: string;
};

const SignUpForm = (props: Props) => {
    const styles: Styles = {
        body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
        container: 'bg-purple-400 min-h-[200px] min-w-[300px] rounded-lg shadow-lg shadow-purple-900',
        title: 'text-lg text-center p-2 bg-purple-300 rounded-t-lg mb-4',
        formContainer: 'flex flex-col',
        userInput:
            'p-1 mx-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white transition rounded-none',
        emailInput:
            'p-1 mt-2 mx-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white transition rounded-none',
        passInput:
            'p-1 mt-2 ml-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white transition rounded-none',
        text: 'text-center',
        textLink: 'underline text-purple-900 hover:text-purple-200',
        errMssg: 'text-red-700 font-bold w-full text-center',
        passSection: 'flex flex-row items-center',
        eyeIconShow: 'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 rounded-lg',
        eyeIconHide: 'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 rounded-lg',
        icon: 'text-purple-200 h-10 w-10',
        signUpPic: 'absolute z-[-1] opacity-0',
        profileBtn:
            'text-purple-200 hover:bg-purple-300/40 hover:text-white flex flex-row place-items-center justify-center gap-2 w-fit pr-1 mx-auto mt-4 rounded-lg',
    };

    const navigate = useNavigate();

    const [err, setErr] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [picInfo, setPicInfo] = useState('Add a profile picture');

    const [pass, setPass] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameInput = e.currentTarget[0] as HTMLInputElement;
        const emailInput = e.currentTarget[1] as HTMLInputElement;
        const passwordInput = e.currentTarget[2] as HTMLInputElement;
        const avatarInput = e.currentTarget[3] as HTMLInputElement;
        const avatarFile = avatarInput.files![0] as File;

        // console.log(e.currentTarget)

        if (emailValid && username.length > 3 && avatarFile !== null) {
            const res = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUserInfo(user, avatarFile);
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    setErr(true);
                });
        }
    };

    const setUserInfo = async (userInfo: any, file: File) => {
        const uid = userInfo.uid;

        const storageRef = ref(storage, `users/${uid}/avatar`);

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
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(userInfo, {
                        displayName: username,
                        photoURL: downloadURL,
                    });
                });
            },
        );

        const newRoomRef = doc(db, 'rooms', 'RP Rooms Community');
        const newRoomRef2 = doc(db, 'rooms', 'Test Room');
        const docSnap = await getDoc(newRoomRef);
        const docSnap2 = await getDoc(newRoomRef);

        if (docSnap.exists()) {
            const charas = Object.keys(docSnap.data().characters);
            const charaCount = charas.length;
            await setDoc(
                newRoomRef,
                {
                    characters: {
                        [uid]: {
                            charaPic: '',
                            charaName: 'New Character',
                            turn: charaCount.toString(),
                            currentTurn: false,
                        },
                    },
                    user: arrayUnion(uid),
                },
                { merge: true },
            );
        } else {
            await setDoc(
                newRoomRef,
                {
                    owner: [uid],
                    roomTitle: 'RP Rooms Community',
                    currentTurn: '',
                    currentChapter: {
                        num: '0',
                        desc: 'A New Beginning!',
                    },
                    characters: {
                        [uid]: {
                            charaPic: '',
                            charaName: 'New Character',
                            turn: '0',
                            currentTurn: true,
                        },
                    },
                    user: arrayUnion(uid),
                    chat: [],
                    story: [],
                },
                { merge: true },
            );
        }
        if (docSnap2.exists()) {
            const charas = Object.keys(docSnap2.data().characters);
            const charaCount = charas.length;
            await setDoc(
                newRoomRef2,
                {
                    characters: {
                        [uid]: {
                            charaPic: '',
                            charaName: 'New Character',
                            turn: charaCount.toString(),
                            currentTurn: false,
                        },
                    },
                    user: arrayUnion(uid),
                },
                { merge: true },
            );
        } else {
            await setDoc(
                newRoomRef2,
                {
                    owner: [uid],
                    roomTitle: 'Test Room',
                    currentTurn: '',
                    currentChapter: {
                        num: '0',
                        desc: 'A New Beginning!',
                    },
                    characters: {
                        [uid]: {
                            charaPic: '',
                            charaName: 'New Character',
                            turn: '0',
                            currentTurn: true,
                        },
                    },
                    user: arrayUnion(uid),
                    chat: [],
                    story: [],
                },
                { merge: true },
            );
        }
        navigate('/');
    };

    const passUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass((prevState) => (prevState = e.target.value));
    };

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail((prevState) => (prevState = e.target.value));

        if (e.target.value.includes('@') && e.target.value.includes('.')) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    const updatePicInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected file
        const file = e.currentTarget.files![0];
        // Get the file name and size
        const { name: fileName, size } = file;
        let fileNameShortened = fileName;
        if (fileName.length > 20) {
            fileNameShortened = fileName.substring(0, 20);
            fileNameShortened = fileNameShortened.concat('...');
            console.log(fileNameShortened);
        }
        // Convert size in bytes to kilo bytes
        const fileSize = (size / 1000).toFixed(2);
        // Set the text content
        const fileNameAndSize = `${fileNameShortened} - ${fileSize}KB`;
        setPicInfo(fileNameAndSize);
    };

    // const passwordConfirmShow = (
    // 	<div className={styles.passSection}>
    // 		<input
    // 			type='test'
    // 			placeholder='Confirm Password'
    // 			className={styles.passInput}
    // 			required
    // 		/>
    // 		<FontAwesomeIcon
    // 			icon={solid('eye')}
    // 			className={styles.eyeIconShow}
    // 			onClick={() => {
    // 				setShowPasswordConfirm((prevState) => !prevState);
    // 			}}
    // 		/>
    // 	</div>
    // );
    // const passwordConfirmHide = (
    // 	<div className={styles.passSection}>
    // 		<input
    // 			type='password'
    // 			placeholder='Confirm Password'
    // 			className={styles.passInput}
    // 			required
    // 		/>
    // 		<FontAwesomeIcon
    // 			icon={solid('eye-slash')}
    // 			className={styles.eyeIconShow}
    // 			onClick={() => {
    // 				setShowPasswordConfirm((prevState) => !prevState);
    // 			}}
    // 		/>
    // 	</div>
    // );

    const passwordShow = (
        <div className={styles.passSection}>
            <input type="text" placeholder="Password" className={styles.passInput} required />
            <FontAwesomeIcon
                icon={solid('eye')}
                className={styles.eyeIconShow}
                onClick={() => {
                    setShowPassword((prevState) => !prevState);
                }}
            />
        </div>
    );
    const passwordHide = (
        <div className={styles.passSection}>
            <input
                type="password"
                placeholder="Password"
                className={styles.passInput}
                onChange={(e) => {
                    passUpdate(e);
                }}
                required
            />
            <FontAwesomeIcon
                icon={solid('eye-slash')}
                className={styles.eyeIconHide}
                onClick={() => {
                    setShowPassword((prevState) => !prevState);
                }}
            />
        </div>
    );

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Sign Up</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.userInput}
                        onChange={(e) => {
                            setUsername((prevState) => (prevState = e.target.value));
                        }}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.emailInput}
                        onChange={(e) => {
                            validateEmail(e);
                        }}
                        required
                    />
                    {showPassword ? passwordShow : passwordHide}
                    <label htmlFor="image-file" className={styles.profileBtn}>
                        <FontAwesomeIcon className={styles.icon} icon={solid('image-portrait')} />
                        {picInfo}
                    </label>
                    <input
                        className={styles.signUpPic}
                        type="file"
                        name="avatar"
                        id="image-file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={(e) => {
                            updatePicInfo(e);
                        }}
                        required
                    />
                    <SignUpBtn />
                </form>
                {err && <p className={styles.errMssg}>Oh no! Something went wrong!</p>}
                <p className={styles.text}>
                    Already a user ?{' '}
                    <Link className={styles.textLink} to="/login">
                        Log In!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
