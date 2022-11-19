import React, { useState, useEffect } from 'react';
import { DropDownItem } from '../exporter';

import loadingAnim from '../../resources/ui/loading-anim.svg';

interface Props {
	roomsSearched: string[];
	addSelectedRoom: (room: string) => void;
}
// type Props = any;
type Styles = {
	container: string;
	body: string;
};

const RoomsDropDown = (props: Props) => {
	const styles: Styles = {
		container:
			'absolute bg-purple-100 flex flex-col h-fit w-full top-[70%] border-2 border-purple-300 transition',
		body: 'bg-purple-100 flex flex-col h-full w-full',
	};

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (props.roomsSearched.length > 0) {
			setIsLoading(false);
		}
	}, [props.roomsSearched]);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<img src={loadingAnim} />
			) : (
				props.roomsSearched.map((room: string) => (
					<DropDownItem
						title={room}
						key={Math.random() * 9}
						addSelectedRoom={props.addSelectedRoom}
					/>
				))
			)}
		</div>
	);
};

export default RoomsDropDown;
