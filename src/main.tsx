import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "./components";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<h1>Empty project</h1>
		</ErrorBoundary>
	</React.StrictMode>
);
