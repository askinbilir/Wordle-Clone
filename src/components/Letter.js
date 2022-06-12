import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
	const {
		board,
		correctWord,
		curAttempt,
		setDisabledLetters,
	} = useContext(AppContext);
	const letter = board[attemptVal][letterPos];

	const correct = correctWord[letterPos] === letter;
	const almost = !correct && letter !== "" && correctWord.includes(letter);

	const letterState = () => {
		if (curAttempt.attemptVal > attemptVal) {
			if (correct) return "correct";
			if (almost) return "almost";
			return "error";
		}
	};

	useEffect(() => {
		if (letter !== "" && !correct && !almost) {
			setDisabledLetters((prev) => [...prev, letter]);
		}
	}, [curAttempt.attemptVal]);

	return (
		<div className="letter" id={letterState()}>
			{letter}
		</div>
	);
};

export default Letter;
