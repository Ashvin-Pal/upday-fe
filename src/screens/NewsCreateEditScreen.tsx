import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/button";
import { GeneralErrorMsg } from "../components/error";
import { NewsFormCreateWrapper, NewsFormEditWrapper } from "../components/news";
import { ROUTES } from "../routes";

import "./NewsCreateEditScreen.css";

export function NewsCreateEditScreen() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formSubmitError, setFormSubmitError] = useState(false);

	const goBackHome = () => navigate(ROUTES.HOME);

	const handleError = () => setFormSubmitError(true);

	if (formSubmitError) {
		return <GeneralErrorMsg returnToHome />;
	}

	if (id) {
		return (
			<section className="News__Form">
				<div className="News__Form__Header">
					<h2>Update News</h2>
					<Button onClick={goBackHome}>Go Back</Button>
				</div>
				<NewsFormEditWrapper id={id} handleSuccess={goBackHome} handleError={handleError} />
			</section>
		);
	}

	return (
		<section className="News__Form">
			<div className="News__Form__Header">
				<h2>Create news</h2>
				<Button onClick={goBackHome}>Go Back</Button>
			</div>
			<NewsFormCreateWrapper handleSuccess={goBackHome} handleError={handleError} />
		</section>
	);
}
