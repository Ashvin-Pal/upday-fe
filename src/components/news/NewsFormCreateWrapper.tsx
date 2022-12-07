import { useState } from "react";
import { API, NEWS_STATUS, postNews } from "../../api";
import { useAuth, useGet } from "../../hooks";
import { BoardsListResType } from "../boards";
import { GeneralErrorMsg } from "../error";
import { LoadingIndicator } from "../loading";
import { NewsForm } from "./NewsForm";

interface NewsFormCreateWrapperType {
	handleSuccess(): void;
	handleError(): void;
}

const defaultFormState = {
	status: NEWS_STATUS.DRAFT,
	boardId: "en",
	title: "",
	description: "",
	author: "",
	imageURL: "",
};

export function NewsFormCreateWrapper({ handleSuccess, handleError }: NewsFormCreateWrapperType) {
	const { email: author } = useAuth();
	const { data: boardList, error } = useGet<BoardsListResType[]>(API.GET_BOARDS);
	const [isSubmitting, setSubmitting] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setSubmitting(true);
		const formData = new FormData(event.currentTarget);
		const newsMap = new Map();
		newsMap.set("status", NEWS_STATUS.DRAFT);
		for (const [fieldName, fieldValue] of formData.entries()) {
			newsMap.set(fieldName, fieldValue);
		}
		postNews(Object.fromEntries(newsMap)).then(handleSuccess).catch(handleError);
	};

	if (error) {
		return <GeneralErrorMsg returnToHome />;
	}

	if (boardList === undefined) {
		return <LoadingIndicator />;
	}

	return (
		<NewsForm
			{...defaultFormState}
			author={author!}
			boardList={boardList}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
		/>
	);
}
