import React, { useState, useEffect } from 'react';
import { DropDownItem } from '../exporter';

import loadingAnim from '../../resources/ui/loading-anim.svg';

interface Props {
	roomsSearched: string[];
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
			console.log('Rooms found: ' + props.roomsSearched);
			setIsLoading(false);
		}
	}, [props.roomsSearched]);

	// console.log(props.roomsSearched);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<img src={loadingAnim} />
			) : (
				props.roomsSearched.map((room: string) => (
					<DropDownItem title={room} key={Math.random() * 9} />
				))
			)}
			{/* {props.roomsSearched.map((room: any) => (
				<DropDownItem title={room} key={Math.random() * 9} />
			))} */}
		</div>
	);
};

export default RoomsDropDown;
