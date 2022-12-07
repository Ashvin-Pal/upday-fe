import { useAuth } from "../../hooks";
import "./Navbar.css";

export function Navbar() {
  const { signOut, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="Navbar">
        <div className="Navbar__Title">
          <h3>Upday!</h3>
        </div>
        <div className="Navbar__SignOut">
          <h5 role="button" onClick={signOut}>
            Sign out
          </h5>
        </div>
      </div>
    );
  }
  return null;
}
