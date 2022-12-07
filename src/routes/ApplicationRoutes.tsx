import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout";
import { ProtectedRoutesProtector } from "./ProtectedRoutesProtector";

import { LoginScreen } from "../screens";

export const ROUTES = {
	/* Paths that do not require authentication*/
	LOGIN: "/login",

	/* Paths that do require authentication*/
	HOME: "/",
	NEWS_FORM: "/news",
	NEWS_FORM_WITH_ID: (id: string) => `/news/${id}`,
	NOT_FOUND: "*",
};

export function ApplicationRoutes() {
	return (
		<Routes>
			<Route path={ROUTES.LOGIN} element={<LoginScreen />} />
		</Routes>
	);
}
