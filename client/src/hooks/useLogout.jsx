import useAuthContext from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  function logout() {
    // remove user from storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  }

  return { logout };
}
