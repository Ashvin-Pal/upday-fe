import { useAuth } from "../hooks";

import "./HomeScreen.css";

export function HomeScreen() {
	const { email } = useAuth();
	const [username] = email?.split("@") || "";

	return (
		<section className="HomeScreen">
			<div className="HomeScreen__Header">
				<h2>Welcome {username}</h2>
			</div>
		</section>
	);
}
