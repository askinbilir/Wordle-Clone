import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey = false, disabled }) => {
	const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

	const selectLetter = () => {
		if (keyVal === "ENTER") onEnter();
		else if (keyVal === "DELETE") onDelete();
		else onSelectLetter(keyVal);
	};

	const keyId = () => {
		if (bigKey) return "big";
		if (disabled) return "disabled";
		return "";
	}

	return (
		<div className="key" id={keyId()} onClick={selectLetter}>
			{keyVal}
		</div>
	);
};
 
export default Key;
