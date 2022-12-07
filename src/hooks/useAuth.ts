import { useContext } from "react";
import { AuthenticationContext } from "../context";

export function useAuth(): AuthenticationContext {
  return useContext(AuthenticationContext);
}
