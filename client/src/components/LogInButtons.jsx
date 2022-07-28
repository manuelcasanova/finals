import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";

const LogInButtons = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div>{`Logged In: ${user.loggedIn}`}</div>
      <div>

        <button className={user.loggedIn ? "button-login-hide" : "button-login"}
          onClick={() => {
            if (user.loggedIn) return;
            setUser({ loggedIn: true });

            //If commented in, if we try to go to a protected page when logged out, and then we log in, it goes automatically there. 

            // if (location.state?.from) {
            //   navigate(location.state.from);
            // }
          }}
        >
          Log In As User
        </button>

        {/* if user logged out hide, else show */}

        <button className={user.loggedIn ? "button-logout" : "button-logout-hide"}
          onClick={() => {
            if (!user.loggedIn) return;
            setUser({ loggedIn: false });
          }}
        >
          Log Out
        </button>

      </div>
    </div>
  );
};

export default LogInButtons;