import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";
import useCookie from "./useCookie";

const LogInButtons = ({buttonText, userId, user, setUser, admin, setAdmin}) => {
  // const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [cookie, updateCookie, deleteCookie] = useCookie("user", undefined);

  useEffect(() => {
    if (cookie !== undefined) {
      setUser({loggedIn: true})
    }
  }, []);

  const logInSetCookie = function() {
    setUser({ loggedIn: true });
    updateCookie(userId, 1)
  }

  const logoutRemoveCookie = function () {
    setUser({ loggedIn: false });
    // Delete cookie here
    // deleteCookie();
  }

  return (
    <div>
      {/* <div>{`Logged In: ${user.loggedIn}`}</div> */}
      <div className={admin.loggedIn ? "log-user-buttons" : ""}>

        <button className={user.loggedIn ? "button-login-hide" : "button-login"}
          onClick={() => {
            if (user.loggedIn) return;
            // setUser({ loggedIn: true });
            logInSetCookie()

            //If commented in, if we try to go to a protected page when logged out, and then we log in, it goes automatically there. 

            // if (location.state?.from) {
            //   navigate(location.state.from);
            // }
          }}
        >
          {/* {buttonText} */}
          Log In as User
        </button>

        <button className={user.loggedIn ? "button-logout" : "button-logout-hide"}
          onClick={() => {
            if (!user.loggedIn) return;
            logoutRemoveCookie();
          }}
        >
          Log Out
        </button>

      </div>
    </div>
  );
};

export default LogInButtons;