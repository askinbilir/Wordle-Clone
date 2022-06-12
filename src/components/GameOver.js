import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
	const { gameOver, setGameOver, correctWord, curAttempt } = useContext(AppContext);
	return (
		<div className="gameOver">
			<h3>{gameOver.winner ? "You Win!" : "Game Over"}</h3>
            <h1>Correct Word: {correctWord}</h1>

            {gameOver.winner && (
                <h3>You guessed in {curAttempt.attemptVal} attempts</h3>
            )}
		</div>
	);
};

export default GameOver;
