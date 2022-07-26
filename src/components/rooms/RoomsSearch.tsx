import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

type Props = unknown;
type Styles = {
	inputBox: string;
};

const RoomsSearch = (props: Props) => {
	const styles: Styles = {
		// container: 'flex flex-col gap-2',
		inputBox: 'flow-root m-auto p-[2px]',
	};

	return (
		<section>
			<input
				className={styles.inputBox}
				type='search'
				name=''
				id=''
				placeholder='Search Rooms...'
			/>
		</section>
	);
};

export default RoomsSearch;
