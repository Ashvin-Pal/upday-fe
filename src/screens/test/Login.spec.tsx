import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoginScreen } from "../LoginScreen";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context";

describe("[Login Screen]", () => {
	test("Renders login screen correctly", async () => {
		const user = userEvent.setup();

		render(
			<BrowserRouter>
				<AuthContextProvider>
					<LoginScreen />
				</AuthContextProvider>
			</BrowserRouter>
		);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("upday");
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Sign in");
		expect(screen.getByLabelText("Your email")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("Sign in");
	});
});
