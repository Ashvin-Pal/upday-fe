import { FieldErrorMsg } from "../error";

import "./TextArea.css";

interface TextAreaType {
	label?: string;
	name: string;
	placeholder?: string;
	defaultValue?: string;
	displayError?: boolean;
	errorMessage?: string;
}

export function TextArea({
	name = "",
	displayError = false,
	defaultValue = "",
	errorMessage = "",
	label,
	placeholder,
}: TextAreaType) {
	return (
		<div className="TextArea">
			<label htmlFor={name}>{label}</label>
			<textarea
				id={name}
				name={name}
				className={displayError ? "error" : ""}
				placeholder={placeholder}
				defaultValue={defaultValue}
			/>
			<FieldErrorMsg displayError={displayError} message={errorMessage} />
		</div>
	);
}
