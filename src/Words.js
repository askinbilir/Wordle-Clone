import wordBank from "./wordle-bank.txt";

export const boardDefault = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
];

export const generateWordSet = async () => {
	let wordSet;
	let todaysWord;
	try {
		wordSet = await fetch(wordBank);
		wordSet = await wordSet.text();
		wordSet = wordSet.split("\r\n");
		todaysWord = wordSet[Math.floor(Math.random() * wordSet.length)];
		wordSet = new Set(wordSet);
	} catch (err) {
		console.log(err);
	}
	return { wordSet, todaysWord };
};
