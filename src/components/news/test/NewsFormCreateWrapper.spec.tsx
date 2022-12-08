import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { API } from "../../../api";
import { AuthenticationContext } from "../../../context";
import { NewsFormCreateWrapper } from "../NewsFormCreateWrapper";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

const testEmail = "stella@upday.com";

const defaultContextValues = {
	email: testEmail,
	isAuthenticated: true,
	signIn: () => {},
	signOut: () => {},
};

const validformValues = {
	author: testEmail,
	boardId: "en",
	description: "My awesome description",
	imageURL: "https://www.upday.com",
	status: "draft",
	title: "My awesome title",
};

const invalidformValues = {
	author: testEmail,
	boardId: "en",
	description: "",
	imageURL: "fakeUrl",
	status: "draft",
	title: "",
};

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
	rest.post(API.POST_NEWS, (req, res, ctx) => {
		return res(ctx.json({}));
	})
);

describe("[Create news form]", () => {
	let handleSuccess: jest.Mock;
	let handleError: jest.Mock;
	let user: UserEvent;

	beforeAll(() => server.listen());
	beforeEach(() => {
		user = userEvent.setup();
		handleSuccess = jest.fn();
		handleError = jest.fn();
	});

	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test("Submit form if fields are valid", async () => {
		render(
			<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
				<NewsFormCreateWrapper handleError={handleError} handleSuccess={handleSuccess} />
			</AuthenticationContext.Provider>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		const titleField = screen.getByLabelText("Title");
		const imageURLField = screen.getByLabelText("Image url");

		expect(screen.getByLabelText("Author")).toHaveAttribute("readonly");

		await user.type(titleField, validformValues.title);
		await user.type(imageURLField, validformValues.imageURL);

		await user.click(screen.getByRole("button"));
		expect(screen.queryByRole("alert")).toBeNull();

		await waitFor(() => expect(handleSuccess).toHaveBeenCalled());
	});

	test("Do not submit form if fields are invalid", async () => {
		render(
			<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
				<NewsFormCreateWrapper handleError={handleError} handleSuccess={handleSuccess} />
			</AuthenticationContext.Provider>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		const imageURLField = screen.getByLabelText("Image url");

		expect(screen.getByLabelText("Author")).toHaveAttribute("readonly");

		await user.type(imageURLField, invalidformValues.imageURL);

		await user.click(screen.getByRole("button"));
		expect(screen.queryAllByRole("alert")).toHaveLength(2);

		await waitFor(() => expect(handleSuccess).not.toHaveBeenCalled());
		await waitFor(() => expect(handleError).not.toHaveBeenCalled());
	});

	test("Handle Error is called when the form is successfully submitted, but the backend returns a 500", async () => {
		server.use(
			rest.post(API.POST_NEWS, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		render(
			<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
				<NewsFormCreateWrapper handleError={handleError} handleSuccess={handleSuccess} />
			</AuthenticationContext.Provider>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		const titleField = screen.getByLabelText("Title");

		await user.type(titleField, validformValues.title);

		await user.click(screen.getByRole("button"));
		expect(screen.queryByRole("alert")).toBeNull();

		await waitFor(() => expect(handleError).toHaveBeenCalled());
	});
});
