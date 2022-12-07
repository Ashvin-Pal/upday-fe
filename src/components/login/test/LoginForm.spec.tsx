import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("[Login Screen]", () => {
	let handleSuccess: jest.Mock;
	let user: UserEvent;

	beforeEach(() => {
		handleSuccess = jest.fn();
		user = userEvent.setup();
		render(<LoginForm handleSucess={handleSuccess} />);
	});

	test("Renders login form correctly", async () => {
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Sign in");
		expect(screen.getByLabelText("Your email")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("Sign in");

		const emailField = screen.getByLabelText("Your email");
		expect(emailField).toHaveAttribute("placeholder", "stella@upday.com");
	});

	test("Submit login form when email is valid and do not display error message", async () => {
		const user = userEvent.setup();
		const testEmail = "newsAgent@upday.com";

		const emailField = screen.getByLabelText("Your email");
		await user.type(emailField, testEmail);
		await user.click(screen.getByRole("button"));
		expect(screen.queryByRole("alert")).toBeNull();
		expect(handleSuccess).toHaveBeenCalledWith(testEmail);
	});

	test("Display error message and do not submit form when email is invalid", async () => {
		const testEmail = "newsAgent";
		const emailField = screen.getByLabelText("Your email");
		await user.type(emailField, testEmail);
		await user.click(screen.getByRole("button"));
		expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
		expect(handleSuccess).not.toHaveBeenCalled();
	});
});
