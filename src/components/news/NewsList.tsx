import { API, NEWS_STATUS } from "../../api";
import { useGet } from "../../hooks";
import { GeneralErrorMsg } from "../error";
import { LoadingIndicator } from "../loading";
import { NewsItem } from "./NewsItem";

import "./NewsList.css";

export interface NewsResType {
	drafts: Archive[];
	published: Archive[];
	archives: Archive[];
}

export interface Archive {
	id: string;
	boardId: string;
	author: string;
	title: string;
	description: string;
	imageURL: string;
	status: NEWS_STATUS | "archived";
	CreatedAt: string;
}

export function NewsList({ id }: { id: string }) {
	const { data, error, revalidate } = useGet<NewsResType>(API.GET_NEWS_BY_BOARD_ID(id));

	const { published = [], drafts = [], archives = [] } = data || {};

	if (error) {
		return <GeneralErrorMsg />;
	}

	if (data === undefined) {
		return <LoadingIndicator />;
	}

	return (
		<div className="NewsList">
			<ul className="NewsList__Header" role="columnheader">
				<h4 className="NewsList__Header__Title">Title</h4>
				<h4 className="NewsList__Header__Status">Status</h4>
				<h4 className="NewsList__Header__Actions">Actions</h4>
			</ul>
			<ul className="NewsList__List" role="list">
				{published.map((_newsItem) => (
					<NewsItem key={_newsItem.id} {..._newsItem} handleSuccess={revalidate} />
				))}
				{drafts.map((_newsItem) => (
					<NewsItem key={_newsItem.id} {..._newsItem} handleSuccess={revalidate} />
				))}
				{archives.map((_newsItem) => (
					<NewsItem key={_newsItem.id} {..._newsItem} handleSuccess={revalidate} />
				))}
			</ul>
		</div>
	);
}
