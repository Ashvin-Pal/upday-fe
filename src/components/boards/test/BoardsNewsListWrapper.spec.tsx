import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BoardsNewsListWrapper } from "../BoardsNewsListWrapper";
import { API } from "../../../api";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
	rest.get(API.GET_BOARDS, (req, res, ctx) => {
		return res(
			ctx.json([
				{ id: "en", name: "England" },
				{ id: "de", name: "Deutsch" },
				{ id: "it", name: "Italiano" },
			])
		);
	})
);

const renderBoardList = () => {
	return (
		<BrowserRouter>
			<BoardsNewsListWrapper />
		</BrowserRouter>
	);
};

describe("[Boards news list]", () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("Loads indicator first and display boards list when data is fetched", async () => {
		render(renderBoardList());
		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());

		await waitFor(() => expect(screen.getByRole("navigation")).toBeInTheDocument());

		const [englandBoard, deutschBoard, italianoBoard] = within(
			screen.getByRole("navigation")
		).getAllByRole("button");

		expect(englandBoard).toHaveTextContent("England");
		expect(deutschBoard).toHaveTextContent("Deutsch");
		expect(italianoBoard).toHaveTextContent("Italiano");
	});

	test("Loads indicator first and display error message when server returns a status 500", async () => {
		server.use(rest.get(API.GET_BOARDS, (req, res, ctx) => res(ctx.status(500))));

		render(renderBoardList());

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());

		expect(screen.getByRole("alert")).toHaveTextContent("Looks like something went wrong.");
	});
});
