import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { LogInBtn } from '../exporter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { ThemeContext } from '../../context/ThemeContext';

type Props = any;
type Styles = {
    body: string;
    container: string;
    title: string;
    formContainer: string;
    userInput: string;
    passInput: string;
    text: string;
    textLink: string;
    errMssg: string;
    passSection: string;
    eyeIconHide: string;
    eyeIconShow: string;
};

const LogInForm = (props: Props) => {
    const styles: Styles = {
        body: 'h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
        container: 'min-h-[200px] min-w-[300px] rounded-lg shadow-lg ',
        title: 'text-lg text-center p-2 rounded-t-lg mb-4 ',
        formContainer: 'flex flex-col',
        userInput:
            'p-1 mx-14 bg-transparent border-b-2 focus:border-white outline-none text-white transition rounded-none ',
        passInput:
            'p-1 mt-2 ml-14 bg-transparent border-b-2 focus:border-white outline-none text-white transition rounded-none ',
        text: 'text-center',
        textLink: 'underline text-purple-900 hover:text-purple-200',
        errMssg: 'text-red-700 font-bold w-full text-center',
        passSection: 'flex flex-row items-center',
        eyeIconShow: 'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 flow-root rounded-lg',
        eyeIconHide: 'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 rounded-lg',
    };
    const theme = useContext(ThemeContext);

    const navigate = useNavigate();

    const [err, setErr] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailInput = e.currentTarget[0] as HTMLInputElement;
        const passwordInput = e.currentTarget[1] as HTMLInputElement;

        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
            });
    };

    const passwordShow = (
        <div className={styles.passSection}>
            <input
                type="text"
                placeholder="Password"
                className={
                    styles.passInput +
                    `placeholder-${theme?.themeColor}-200 caret-${theme?.themeColor}-100 border-${theme?.themeColor}-200`
                }
                required
            />
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
                className={
                    styles.passInput +
                    `placeholder-${theme?.themeColor}-200 caret-${theme?.themeColor}-100 border-${theme?.themeColor}-200`
                }
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
        <>
            <div className={styles.body}>
                <div className={styles.container + `bg-${theme?.themeColor}-400 shadow-${theme?.themeColor}-900`}>
                    <h1 className={styles.title + `bg-${theme?.themeColor}-300`}>Log In</h1>
                    <form
                        className={styles.formContainer}
                        onSubmit={(e) => {
                            handleLogIn(e);
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className={
                                styles.userInput +
                                `placeholder-${theme?.themeColor}-200 caret-${theme?.themeColor}-100 border-${theme?.themeColor}-200`
                            }
                        />
                        {showPassword ? passwordShow : passwordHide}
                        <LogInBtn />
                    </form>
                    {err && <p className={styles.errMssg}>Oh no! Something went wrong!</p>}
                    <p className={styles.text}>
                        Not a user ?{' '}
                        <Link className={styles.textLink} to="/signup">
                            Sign Up!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LogInForm;
