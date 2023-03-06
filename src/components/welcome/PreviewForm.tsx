import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import { ThemeContext } from '../../context/ThemeContext';

const PreviewForm = () => {
    const styles = {
        container: 'absolute left-[50%] top-[3vh] translate-x-[-50%]',
        body: 'px-4 py-2 rounded-lg shadow-lg ',
        text: 'text-center text-white',
        button: 'py-1 px-2 rounded-lg my-2 flow-root mx-auto text-white ',
    };

    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

    const handlePreviewLogIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, 'testing123@gmail.com', 'testingrprooms')
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
            });
    };

    console.log(theme?.themeColor);

    return (
        <div className={styles.container}>
            <form
                className={styles.body + `bg-${theme?.themeColor}-400 shadow-${theme?.themeColor}-900`}
                onSubmit={(e) => handlePreviewLogIn(e)}
            >
                <p className={styles.text}>Want to take a quick look on a guest account instead?</p>
                <button className={styles.button + `bg-${theme?.themeColor}-700 hover:bg-${theme?.themeColor}-600`}>
                    Preview RP Rooms
                </button>
            </form>
        </div>
    );
};

export default PreviewForm;
