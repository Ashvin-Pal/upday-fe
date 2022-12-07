import "./BoardList.css";

interface BoardListType {
	setCurrentBoard(id: string): void;
	currentSelectedBoard: string;
	boardsList: { name: string; id: string }[];
}

export function BoardList({ boardsList, currentSelectedBoard, setCurrentBoard }: BoardListType) {
	const getClassname = (id: string) => {
		return currentSelectedBoard === id ? "BoardList__Item__Selected" : "BoardList__Item";
	};

	return (
		<div className="BoardList" role="navigation">
			{boardsList.map(({ name, id }) => (
				<h5
					key={id}
					role="button"
					onClick={() => setCurrentBoard(id)}
					className={getClassname(id)}
				>
					{name}
				</h5>
			))}
		</div>
	);
}
