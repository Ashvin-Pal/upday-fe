import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components";
import { useAuth } from "../hooks";
import { ROUTES } from "../routes";

import "./Login.css";

export function LoginScreen() {
	const navigate = useNavigate();
	const { signIn } = useAuth();

	const handleSuccess = (email: string) => {
		signIn(email, () => navigate(ROUTES.HOME, { replace: true }));
	};

	return (
		<div className="Login">
			<LoginForm handleSucess={handleSuccess} />
		</div>
	);
}
