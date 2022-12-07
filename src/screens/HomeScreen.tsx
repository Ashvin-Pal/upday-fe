import { Link } from "react-router-dom";
import { BoardsNewsListWrapper, Button } from "../components";
import { useAuth } from "../hooks";
import { ROUTES } from "../routes";

import "./HomeScreen.css";

export function HomeScreen() {
	const { email } = useAuth();
	const [username] = email?.split("@") || "";

	return (
		<section className="HomeScreen">
			<div className="HomeScreen__Header">
				<h2>Welcome {username}</h2>
				<Link style={{ textDecoration: "none" }} to={ROUTES.NEWS_FORM}>
					<Button>Create News</Button>
				</Link>
			</div>
			<BoardsNewsListWrapper />
		</section>
	);
}
