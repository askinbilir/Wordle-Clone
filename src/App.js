import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Board, GameOver, Keyboard } from "./components";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

const App = () => {
	const [board, setBoard] = useState(boardDefault);
	const [curAttempt, setCurAttempt] = useState({ attemptVal: 0, letterPos: 0 });
	const [wordSet, setWordSet] = useState(new Set());
	const [disabledLetters, setDisabledLetters] = useState([]);
	const [gameOver, setGameOver] = useState({ gameOver: false, winner: false });
	const [correctWord, setCorrectWord] = useState("");

	useEffect(() => {
		generateWordSet().then((words) => {
			setWordSet(words.wordSet);
			setCorrectWord(words.todaysWord.toUpperCase());
		});
	}, []);

	const onSelectLetter = (keyVal) => {
		if (curAttempt.letterPos > 4) return;
		const newBoard = [...board];
		newBoard[curAttempt.attemptVal][curAttempt.letterPos] = keyVal;
		setBoard(newBoard);
		setCurAttempt({ ...curAttempt, letterPos: curAttempt.letterPos + 1 });
	};
	const onEnter = () => {
		if (curAttempt.letterPos < 5) return;

		let curWord = "";
		for (let i = 0; i < 5; i++) {
			curWord += board[curAttempt.attemptVal][i];
		}

		if (wordSet.has(curWord.toLowerCase())) {
			setCurAttempt({ attemptVal: curAttempt.attemptVal + 1, letterPos: 0 });
		} else {
			alert("Word Not Found");
			return;
		}

		if (curWord === correctWord) {
			setGameOver({ gameOver: true, winner: true });
			return;
		}

		if (curAttempt.attemptVal === 5) {
			setGameOver({ gameOver: true, winner: false });
			return;
		}
	};
	const onDelete = () => {
		if (curAttempt.letterPos < 1) return;
		const newBoard = [...board];
		newBoard[curAttempt.attemptVal][curAttempt.letterPos - 1] = "";
		setBoard(newBoard);
		setCurAttempt({ ...curAttempt, letterPos: curAttempt.letterPos - 1 });
	};

	return (
		<div className="App">
			<nav>
				<h1>Wordle</h1>
			</nav>
			<AppContext.Provider
				value={{
					board,
					setBoard,
					curAttempt,
					setCurAttempt,
					onSelectLetter,
					onEnter,
					onDelete,
					correctWord,
					disabledLetters,
					setDisabledLetters,
					gameOver,
					setGameOver,
				}}
			>
				<div className="game">
					<Board />
					{gameOver.gameOver ? <GameOver /> : <Keyboard />}
				</div>
			</AppContext.Provider>
		</div>
	);
};

export default App;
