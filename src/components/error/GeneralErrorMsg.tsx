import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Button } from "../button";
import "./GeneralErrorMsg.css";

export function GeneralErrorMsg({ returnToHome = false }: { returnToHome?: boolean }) {
  return (
    <div className="GeneralErrorMsg">
      <h4>Looks like something went wrong.</h4>
      <h5>Please try again later.</h5>
      <br />
      {returnToHome && (
        <Link style={{ textDecoration: "none" }} to={ROUTES.HOME}>
          <Button>Back to Home</Button>
        </Link>
      )}
    </div>
  );
}
