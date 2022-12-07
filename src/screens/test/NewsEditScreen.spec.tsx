import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewsCreateEditScreen } from "../NewsCreateEditScreen";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContext } from "../../context";
import { API } from "../../api";
import { newsListResponse } from "../../mocks";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({
		id: "1234",
	}),
}));

const server = setupServer(
	rest.get(API.GET_BOARDS, (req, res, ctx) => {
		return res(
			ctx.json([
				{ id: "en", name: "England" },
				{ id: "de", name: "Deutsch" },
				{ id: "it", name: "Italiano" },
			])
		);
	}),
	rest.get(API.GET_NEWS_BY_ID("1234"), (req, res, ctx) => {
		return res(ctx.json(newsListResponse.published[0]));
	})
);

describe("[News Edit Screen]", () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("Renders News Edit Screen in edit mode", async () => {
		const defaultContextValues = {
			email: "stella@upday.com",
			isAuthenticated: true,
			signIn: () => {},
			signOut: () => {},
		};

		render(
			<BrowserRouter>
				<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
					<NewsCreateEditScreen />
				</AuthenticationContext.Provider>
			</BrowserRouter>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Update News");
	});

	test("Display Error when rendering News edit screen due to a fail response from the backend", async () => {
		server.use(
			rest.get(API.GET_BOARDS, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		const defaultContextValues = {
			email: "stella@upday.com",
			isAuthenticated: true,
			signIn: () => {},
			signOut: () => {},
		};

		render(
			<BrowserRouter>
				<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
					<NewsCreateEditScreen />
				</AuthenticationContext.Provider>
			</BrowserRouter>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());

		expect(screen.getByRole("alert")).toHaveTextContent("Looks like something went wrong.");
	});
});
