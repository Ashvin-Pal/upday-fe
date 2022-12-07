import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { API } from "../../../api";
import { NewsFormEditWrapper } from "../NewsFormEditWrapper";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { newsListResponse } from "../../../mocks";

const validformValues = {
	author: "stella@upday.com",
	boardId: "en",
	description: "My awesome description",
	imageURL: "https://www.upday.com",
	status: "draft",
	title: "My awesome title",
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
	rest.get(API.GET_NEWS_BY_ID("1234"), (req, res, ctx) => {
		return res(ctx.json(newsListResponse.published[0]));
	}),
	rest.put(API.POST_NEWS, (req, res, ctx) => {
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

	test("Populating a form from the backend and resubmitting it back should call the handle sucess function", async () => {
		render(
			<NewsFormEditWrapper
				id="1234"
				handleError={handleError}
				handleSuccess={handleSuccess}
			/>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		await user.click(screen.getByRole("button"));
		expect(screen.queryByRole("alert")).toBeNull();

		await waitFor(() => expect(handleSuccess).toHaveBeenCalled());
	});

	test("Do not submit form if fields are invalid", async () => {
		render(
			<NewsFormEditWrapper
				id="1234"
				handleError={handleError}
				handleSuccess={handleSuccess}
			/>
		);

		await waitFor(() => expect(screen.getByTestId("loading-indicator")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());

		const titleField = screen.getByLabelText("Title");
		const descriptionField = screen.getByLabelText("Description");
		const imageURLField = screen.getByLabelText("Image url");

		expect(screen.getByLabelText("Author")).toHaveAttribute("readonly");

		await user.clear(titleField);
		await user.clear(descriptionField);
		await user.clear(imageURLField);

		await user.click(screen.getByRole("button"));
		expect(screen.queryAllByRole("alert")).toHaveLength(3);

		await waitFor(() => expect(handleSuccess).not.toHaveBeenCalled());
		await waitFor(() => expect(handleError).not.toHaveBeenCalled());
	});

	test("Handle Error is called when the form is succesfully submitted, but the backend returns a 500", async () => {
		server.use(
			rest.put(API.POST_NEWS, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		render(
			<NewsFormEditWrapper
				id="1234"
				handleError={handleError}
				handleSuccess={handleSuccess}
			/>
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
