import { FieldErrorMsg } from "../error";

import "./TextInput.css";

interface TextInputType {
	label?: string;
	name: string;
	placeholder?: string;
	defaultValue?: string;
	displayError?: boolean;
	errorMessage?: string;
	type?: "text" | "email" | "url";
	readOnly?: boolean;
}

export function TextInput({
	name = "",
	type = "text",
	displayError = false,
	defaultValue = "",
	errorMessage = "",
	label,
	placeholder,
	readOnly = false,
}: TextInputType) {
	return (
		<div className="Text__Input">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				className={displayError ? "error" : ""}
				name={name}
				type={type}
				placeholder={placeholder}
				defaultValue={defaultValue}
				readOnly={readOnly}
			/>
			<FieldErrorMsg displayError={displayError} message={errorMessage} />
		</div>
	);
}
