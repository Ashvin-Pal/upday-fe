import { useNavigate } from "react-router-dom";
import { deleteNewsById, NEWS_STATUS, updateNewsStatusById } from "../../api";
import { ROUTES } from "../../routes";
import { ButtonSimple } from "../button";

import "./NewsItem.css";
import { NewsStatus } from "./NewsStatus";

const isNewsReadyForPublishing = ({
	title,
	author,
	description,
	imageURL,
	status,
}: {
	title: string;
	author: string;
	description: string;
	imageURL: string;
	status: string;
}) => {
	if (!!title && !!author && !!description && !!imageURL && status === NEWS_STATUS.DRAFT) {
		return true;
	}
	return false;
};

interface NewsItemType {
	id: string;
	title: string;
	author: string;
	description: string;
	imageURL: string;
	status: NEWS_STATUS | "archived";
	handleSuccess(): void;
}

export function NewsItem(props: NewsItemType) {
	const { id, title, status, handleSuccess } = props;
	const navigate = useNavigate();

	const handleEdit = (id: string) => navigate(ROUTES.NEWS_FORM_WITH_ID(id));

	const handleDelete = (id: string) => {
		deleteNewsById(id).then(handleSuccess).catch(handleSuccess);
	};

	const handleUpdateNewsStatus = (id: string, _status: NEWS_STATUS) => {
		updateNewsStatusById(id, _status).then(handleSuccess).catch(handleSuccess);
	};

	/**Using a hardcoded string due to a bug in the backend */
	if (status === "archived") {
		return (
			<li className="NewsItem" role="listitem">
				<h5 className="NewsItem__Title">{title}</h5>
				<div className="NewsItem__Status">
					<NewsStatus status={status} />
				</div>
				<div className="NewsItem__Actions">
					<ButtonSimple onClick={() => handleDelete(id)}>Delete</ButtonSimple>
				</div>
			</li>
		);
	}

	if (status === NEWS_STATUS.DRAFT) {
		return (
			<li className="NewsItem" role="listitem">
				<h5 className="NewsItem__Title">{title}</h5>
				<div className="NewsItem__Status">
					<NewsStatus status={status} />
				</div>
				<div className="NewsItem__Actions">
					<ButtonSimple onClick={() => handleUpdateNewsStatus(id, NEWS_STATUS.ARCHIVE)}>
						Archive
					</ButtonSimple>
					<ButtonSimple
						disabled={!isNewsReadyForPublishing(props)}
						onClick={() => handleUpdateNewsStatus(id, NEWS_STATUS.PUBLISHED)}
					>
						Publish
					</ButtonSimple>
					<ButtonSimple onClick={() => handleEdit(id)}>Edit</ButtonSimple>
					<ButtonSimple onClick={() => handleDelete(id)}>Delete</ButtonSimple>
				</div>
			</li>
		);
	}

	/**
	 * Defaults returns the news in Published status
	 */
	return (
		<li className="NewsItem" role="listitem">
			<h5 className="NewsItem__Title">{title}</h5>
			<div className="NewsItem__Status">
				<NewsStatus status={status} />
			</div>
			<div className="NewsItem__Actions">
				<ButtonSimple onClick={() => handleUpdateNewsStatus(id, NEWS_STATUS.ARCHIVE)}>
					Archive
				</ButtonSimple>
				<ButtonSimple onClick={() => handleUpdateNewsStatus(id, NEWS_STATUS.DRAFT)}>
					Draft
				</ButtonSimple>
				<ButtonSimple onClick={() => handleEdit(id)}>Edit</ButtonSimple>
				<ButtonSimple onClick={() => handleDelete(id)}>Delete</ButtonSimple>
			</div>
		</li>
	);
}
