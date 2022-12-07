import { Link } from "react-router-dom";
import { Button } from "../components";
import { ROUTES } from "../routes";

import "./NotFoundScreen.css";

export function NotFoundScreen() {
	return (
		<section className="NotFoundScreen">
			<h3>We were unable to find the page you were looking for</h3>
			<h3>&#128546;</h3>
			<Link to={ROUTES.HOME} style={{ textDecoration: "none" }}>
				<Button>Return Home</Button>
			</Link>
		</section>
	);
}
