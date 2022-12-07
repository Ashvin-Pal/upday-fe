import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<main>
			<nav className="navbar"></nav>
			<div className="content">
				<Outlet />
			</div>
		</main>
	);
}
