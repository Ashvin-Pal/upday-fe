import { useState } from "react";
import { NEWS_STATUS } from "../../api";
import { BoardsListResType } from "../boards";
import { Button } from "../button";
import { SelectInput, TextArea, TextInput } from "../input";
import { NewsStatus } from "./NewsStatus";

interface NewsFormType {
	status: NEWS_STATUS;
	boardId: string;
	title: string;
	description: string;
	author: string;
	imageURL: string;
	boardList: BoardsListResType[];
	handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
	isSubmitting: boolean;
	isEditMode?: boolean;
}

function isValidUrl(string: string) {
	try {
		new URL(string);
		return true;
	} catch (_) {
		return false;
	}
}

const validateDraftFields = {
	title: (val: string) => !!val,
	imageUrl: (val: string) => (val ? isValidUrl(val) : true),
};

const validatePublishedFields = {
	title: (val: string) => !!val,
	description: (val: string) => !!val,
	imageUrl: (val: string) => isValidUrl(val),
};

export function NewsForm({
	status,
	boardId,
	title,
	description,
	author,
	imageURL,
	boardList,
	handleSubmit,
	isSubmitting,
	isEditMode = false,
}: NewsFormType) {
	const [fieldValidation, setFieldValidation] = useState({
		isTitleValid: true,
		isImageURLValid: true,
		isDescriptionValid: true,
	});

	const handleInternalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const title = formData.get("title");
		const description = formData.get("description");
		const imageURL = formData.get("imageURL");

		if (status === NEWS_STATUS.PUBLISHED) {
			const isTitleValid = validatePublishedFields.title(title as string);
			const isDescriptionValid = validatePublishedFields.description(description as string);
			const isImageURLValid = validatePublishedFields.imageUrl(imageURL as string);
			if (isTitleValid && isDescriptionValid && isImageURLValid) handleSubmit(event);
			else setFieldValidation({ isDescriptionValid, isTitleValid, isImageURLValid });
			return;
		} else {
			const isTitleValid = validateDraftFields.title(title as string);
			const isImageURLValid = validateDraftFields.imageUrl(imageURL as string);
			if (isTitleValid && isImageURLValid) handleSubmit(event);
			else setFieldValidation({ ...fieldValidation, isTitleValid, isImageURLValid });
		}
	};

	return (
		<form onSubmit={handleInternalSubmit} noValidate className="Form" role="form">
			{isEditMode && <NewsStatus status={status} />}
			<SelectInput
				name="boardId"
				defaultValue={boardId}
				disabled={isEditMode}
				values={boardList}
				label="News board"
			/>
			<TextInput
				name="title"
				type="text"
				placeholder="My awesome clickbait title"
				defaultValue={title}
				label="Title"
				displayError={!fieldValidation.isTitleValid}
				errorMessage="Title is required"
			/>
			<TextInput name="author" type="email" defaultValue={author} readOnly label="Author" />
			<TextArea
				name="description"
				placeholder="News content"
				defaultValue={description}
				label="Description"
				displayError={!fieldValidation.isDescriptionValid}
				errorMessage="Description is required"
			/>
			<TextInput
				name="imageURL"
				type="url"
				defaultValue={imageURL}
				placeholder="https://www.google.com/"
				label="Image url"
				displayError={!fieldValidation.isImageURLValid}
				errorMessage="Invalid Url"
			/>
			<Button disabled={isSubmitting} type="submit">
				Save
			</Button>
		</form>
	);
}
