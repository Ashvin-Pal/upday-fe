import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewsList } from "../NewsList";
import { API } from "../../../api";
import { BrowserRouter } from "react-router-dom";
import { newsEmptyListResponse, newsListResponse } from "../../../mocks";

const defaultBoardId = "en";

const server = setupServer(
	rest.get(API.GET_NEWS_BY_BOARD_ID(defaultBoardId), (req, res, ctx) => {
		return res(ctx.json(newsListResponse));
	})
);

const renderNewsList = () => {
	return (
		<BrowserRouter>
			<NewsList id={defaultBoardId} />
		</BrowserRouter>
	);
};

describe("[Boards news list]", () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("Display news list with the correct title and status", async () => {
		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const [publishedNewsItem, draftNewsItem, , archivedNewsItem] =
			screen.getAllByRole("listitem");

		expect(within(publishedNewsItem).getByRole("heading")).toHaveTextContent("Published news");
		expect(within(draftNewsItem).getByRole("heading")).toHaveTextContent("Draft news");
		expect(within(archivedNewsItem).getByRole("heading")).toHaveTextContent("Archived news");

		expect(within(publishedNewsItem).getByRole("contentinfo")).toHaveTextContent("published");
		expect(within(draftNewsItem).getByRole("contentinfo")).toHaveTextContent("draft");
		expect(within(archivedNewsItem).getByRole("contentinfo")).toHaveTextContent("archived");
	});

	test("Display Published new item with the correct actions", async () => {
		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const NewsItem = screen.getAllByRole("listitem")[0];

		const [ArchiveAction, DraftAction, EditAction, DeleteAction] =
			within(NewsItem).getAllByRole("button");

		expect(ArchiveAction).toHaveTextContent("Archive");
		expect(DraftAction).toHaveTextContent("Draft");
		expect(EditAction).toHaveTextContent("Edit");
		expect(DeleteAction).toHaveTextContent("Delete");
	});

	test("Display Draft new item with the correct actions and publish action should be enable", async () => {
		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const NewsItem = screen.getAllByRole("listitem")[1];
		const [ArchiveAction, PublishAction, EditAction, DeleteAction] =
			within(NewsItem).getAllByRole("button");

		expect(ArchiveAction).toHaveTextContent("Archive");
		expect(PublishAction).toHaveTextContent("Publish");
		expect(PublishAction).toBeEnabled();
		expect(EditAction).toHaveTextContent("Edit");
		expect(DeleteAction).toHaveTextContent("Delete");
	});

	test("Display Draft new item with the correct actions and publish action should be disable", async () => {
		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const NewsItem = screen.getAllByRole("listitem")[2];
		const [ArchiveAction, PublishAction, EditAction, DeleteAction] =
			within(NewsItem).getAllByRole("button");

		expect(ArchiveAction).toHaveTextContent("Archive");
		expect(PublishAction).toHaveTextContent("Publish");
		expect(PublishAction).toBeDisabled();
		expect(EditAction).toHaveTextContent("Edit");
		expect(DeleteAction).toHaveTextContent("Delete");
	});

	test("Display Archive new item with the correct actions", async () => {
		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const NewsItem = screen.getAllByRole("listitem")[3];
		const [DeleteAction] = within(NewsItem).getAllByRole("button");

		expect(DeleteAction).toHaveTextContent("Delete");
	});

	test("Loads loading indicator first and display news list header when there are no news to display", async () => {
		server.use(
			rest.get(API.GET_NEWS_BY_BOARD_ID(defaultBoardId), (req, res, ctx) =>
				res(ctx.json(newsEmptyListResponse))
			)
		);
		render(renderNewsList());
		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());

		await waitFor(() => expect(screen.getByRole("columnheader")).toBeInTheDocument());

		const [titleHeader, statusHeader, actionsHeader] = within(
			screen.getByRole("columnheader")
		).getAllByRole("heading");

		expect(titleHeader).toHaveTextContent("Title");
		expect(statusHeader).toHaveTextContent("Status");
		expect(actionsHeader).toHaveTextContent("Actions");
	});

	test("Loads indicator first and display error message when server returns a status 500", async () => {
		server.use(
			rest.get(API.GET_NEWS_BY_BOARD_ID(defaultBoardId), (req, res, ctx) =>
				res(ctx.status(500))
			)
		);

		render(renderNewsList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());

		expect(screen.getByRole("alert")).toHaveTextContent("Looks like something went wrong.");
	});
});
