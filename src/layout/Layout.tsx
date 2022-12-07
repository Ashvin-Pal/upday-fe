import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export function Layout() {
	return (
		<main>
			<nav className="navbar">
				<Navbar />
			</nav>
			<div className="content">
				<Outlet />
			</div>
		</main>
	);
}
