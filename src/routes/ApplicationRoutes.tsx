import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout";
import { HomeScreen, LoginScreen, NotFoundScreen, NewsCreateEditScreen } from "../screens";
import { ProtectedRoutesProtector } from "./ProtectedRoutesProtector";

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
			<Route element={<Layout />}>
				<Route path={ROUTES.LOGIN} element={<LoginScreen />} />
				<Route
					path={ROUTES.HOME}
					element={
						<ProtectedRoutesProtector>
							<HomeScreen />
						</ProtectedRoutesProtector>
					}
				/>
				<Route
					path={ROUTES.NEWS_FORM}
					element={
						<ProtectedRoutesProtector>
							<NewsCreateEditScreen />
						</ProtectedRoutesProtector>
					}
				/>
				<Route
					path={ROUTES.NEWS_FORM_WITH_ID(":id")}
					element={
						<ProtectedRoutesProtector>
							<NewsCreateEditScreen />
						</ProtectedRoutesProtector>
					}
				/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundScreen />} />
			</Route>
		</Routes>
	);
}
