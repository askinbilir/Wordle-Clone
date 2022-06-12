import React, { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

const Keyboard = () => {
	const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

	const { onSelectLetter, onEnter, onDelete, disabledLetters } =
		useContext(AppContext);

	const handleKeyboard = useCallback(
		(event) => {
			const key = event.key.toUpperCase();
			if (key === "ENTER") onEnter();
			else if (key === "DELETE" || key === "BACKSPACE") onDelete();
			else
				[...keys1, ...keys2, ...keys3].forEach((letter) => {
					if (key === letter) onSelectLetter(letter);
				});
		},
		[onSelectLetter, onEnter, onDelete]
	);

	useEffect(() => {
		document.addEventListener("keyup", handleKeyboard);
		return () => document.removeEventListener("keyup", handleKeyboard);
	}, [handleKeyboard]);

	return (
		<div className="keyboard" onKeyUp={handleKeyboard}>
			<div className="line1">
				{keys1.map((key, index) => {
					return (
						<Key
							keyVal={key}
							key={`line1-${index}`}
							disabled={disabledLetters.includes(key)}
						/>
					);
				})}
			</div>
			<div className="line2">
				{keys2.map((key, index) => {
					return (
						<Key
							keyVal={key}
							key={`line2-${index}`}
							disabled={disabledLetters.includes(key)}
						/>
					);
				})}
			</div>
			<div className="line3">
				<Key keyVal="ENTER" bigKey />
				{keys3.map((key, index) => {
					return (
						<Key
							keyVal={key}
							key={`line3-${index}`}
							disabled={disabledLetters.includes(key)}
						/>
					);
				})}
				<Key keyVal="DELETE" bigKey />
			</div> 
		</div>
	);
};

export default Keyboard;
