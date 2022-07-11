import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import styles from '../styles/roomListContainer/roomListContainer.module.scss';

// import { RoomSearch, TeamRoomList, TeamRoomPreview } from './';

type Props = {};

const Sidebar = (props: Props) => {
	return <div className={styles.sidebar}>Tester</div>;
};

const RoomListContainer = (props: Props) => {
	return <Sidebar />;
};

export default RoomListContainer;
