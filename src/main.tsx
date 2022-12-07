import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components";
import { AuthContextProvider } from "./context";
import { ApplicationRoutes } from "./routes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<AuthContextProvider>
					<ApplicationRoutes />
				</AuthContextProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
