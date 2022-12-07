import { useEffect, useState } from "react";
import { API } from "../../api";
import { useGet } from "../../hooks";
import { GeneralErrorMsg } from "../error";
import { LoadingIndicator } from "../loading";
import { NewsList } from "../news";
import { BoardList } from "./BoardList";

export interface BoardsListResType {
	name: string;
	id: string;
}

export function BoardsNewsListWrapper() {
	const { data, error } = useGet<BoardsListResType[]>(API.GET_BOARDS);
	const [currentBoard, setCurrentBoard] = useState("");

	useEffect(() => {
		if (data?.length) {
			const [firstBoard] = data;
			const { id } = firstBoard;
			setCurrentBoard(id);
		}
	}, [data]);

	if (error) {
		return <GeneralErrorMsg />;
	}

	if (data === undefined) {
		return <LoadingIndicator />;
	}

	return (
		<section>
			<BoardList
				setCurrentBoard={setCurrentBoard}
				boardsList={data}
				currentSelectedBoard={currentBoard}
			/>
			{currentBoard && <NewsList id={currentBoard} />}
		</section>
	);
}
