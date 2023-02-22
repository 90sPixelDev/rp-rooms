import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';

const PreviewForm = () => {
    const styles = {
        container: 'absolute left-[50%] top-[3vh] translate-x-[-50%]',
        body: 'bg-purple-400 px-4 py-2 rounded-lg shadow-lg',
        text: 'text-center text-white',
        button: 'bg-purple-700 py-1 px-2 rounded-lg my-2 flow-root mx-auto text-white hover:bg-purple-600',
    };

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

    return (
        <div className={styles.container}>
            <form className={styles.body} onSubmit={(e) => handlePreviewLogIn(e)}>
                <p className={styles.text}>Want to take a quick look on a guest account instead?</p>
                <button className={styles.button}>Preview RP Rooms</button>
            </form>
        </div>
    );
};

export default PreviewForm;
