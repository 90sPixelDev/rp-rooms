import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    disabled: boolean;
    sendMssg: () => void;
}
type Styles = {
    body: string;
    icon: string;
};

const ChatSend = (props: Props) => {
    const styles: Styles = {
        body: 'rounded-tr-lg flex flex-row justify-center grow w-[10%] ',
        icon: 'm-auto h-[40%] w-[40%]',
    };

    const theme = useContext(ThemeContext);

    const sendIcon = <FontAwesomeIcon icon={solid('paper-plane')} size="lg" className={styles.icon} />;

    return (
        <button
            className={styles.body + `bg-${theme?.themeColor}-400 hover:text-${theme?.themeColor}-700`}
            onClick={props.sendMssg}
            disabled={props.disabled}
        >
            {sendIcon}
        </button>
    );
};

export default ChatSend;
