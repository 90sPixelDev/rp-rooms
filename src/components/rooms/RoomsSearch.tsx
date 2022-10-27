import React, { useState, useEffect } from 'react';

type Props = unknown;
type Styles = {
	inputBox: string;
};
type Text = string;

const RoomsSearch = (props: Props) => {
	const styles: Styles = {
		// container: 'flex flex-col gap-2',
		inputBox:
			'flow-root m-auto p-[2px] rounded-lg px-1 outline-purple-500 mb-4',
	};

	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);

	const getRooms = async (text: Text) => {
		try {
			// TODO: fetch rooms
		} catch (err) {
			setQuery('');
		}
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		setLoading(true);
		setQuery(e.target.value);
		getRooms(e.target.value);
	};

	return (
		<section>
			<input
				className={styles.inputBox}
				type='text'
				value={query}
				onChange={onSearch}
				name=''
				id=''
				placeholder='Search Rooms...'
			/>
		</section>
	);
};

export default RoomsSearch;
