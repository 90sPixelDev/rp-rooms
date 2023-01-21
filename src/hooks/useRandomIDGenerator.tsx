import React from 'react';

const useRandomIDGenerator = () => {
	const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const letters: string[] = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];
	const randomletters = () => {
		let letterSection = '';
		for (let i = 0; i < 6; i++) {
			const int = Math.floor(Math.random() * letters.length);
			letterSection += letters[int];
		}
		return letterSection;
	};
	const randomNumbers = () => {
		let numbersSection = '';
		for (let i = 0; i < 6; i++) {
			const int = Math.floor(Math.random() * numbers.length);
			numbersSection += numbers[int];
		}
		return numbersSection;
	};

	const idString = randomletters() + randomNumbers();

	return idString;
};

export default useRandomIDGenerator;
