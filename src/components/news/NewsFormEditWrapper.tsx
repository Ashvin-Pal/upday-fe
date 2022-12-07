import { useState } from "react";
import { API, updateNewsById } from "../../api";
import { useGet } from "../../hooks";
import { BoardsListResType } from "../boards";
import { GeneralErrorMsg } from "../error";
import { LoadingIndicator } from "../loading";
import { NewsForm } from "./NewsForm";

interface NewsFormEditWrapperType {
	id: string;
	handleSuccess(): void;
	handleError(): void;
}

export function NewsFormEditWrapper({ id, handleSuccess, handleError }: NewsFormEditWrapperType) {
	const { data: newsById, error: newsByIdError } = useGet<any>(API.GET_NEWS_BY_ID(id));
	const { data: boardList, error: boardsListError } = useGet<BoardsListResType[]>(API.GET_BOARDS);
	const [isSubmitting, setSubmitting] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setSubmitting(true);
		const formData = new FormData(event.currentTarget);
		const newsMap = new Map();
		for (const [fieldName, fieldValue] of formData.entries()) {
			newsMap.set(fieldName, fieldValue);
		}
		const mergeFormData = { ...newsById, ...Object.fromEntries(newsMap) };

		updateNewsById(mergeFormData).then(handleSuccess).catch(handleError);
	};

	if (newsByIdError || boardsListError) {
		return <GeneralErrorMsg returnToHome />;
	}

	if (newsById === undefined || boardList === undefined) {
		return <LoadingIndicator />;
	}

	return (
		<NewsForm
			{...newsById}
			boardList={boardList}
			handleSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			isEditMode
		/>
	);
}
