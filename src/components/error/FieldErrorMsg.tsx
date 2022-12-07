interface FieldErrorMsgType {
	displayError: boolean;
	message: string;
}

export function FieldErrorMsg({ displayError, message }: FieldErrorMsgType) {
	if (displayError)
		return (
			<span role="alert" className="Field__Error__Msg">
				{message}
			</span>
		);

	return null;
}
