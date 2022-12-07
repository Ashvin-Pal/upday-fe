import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomeScreen } from "../HomeScreen";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContext } from "../../context";

describe("[Home Screen]", () => {
	test("Renders home screen correctly", async () => {
		const defaultContextValues = {
			email: "stella@upday.com",
			isAuthenticated: true,
			signIn: () => {},
			signOut: () => {},
		};

		render(
			<BrowserRouter>
				<AuthenticationContext.Provider value={{ ...defaultContextValues }}>
					<HomeScreen />
				</AuthenticationContext.Provider>
			</BrowserRouter>
		);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Welcome stella");
	});
});
