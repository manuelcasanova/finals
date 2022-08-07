import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";

const LogInAdminButtons = ({user, setUser, admin, setAdmin}) => {
  // const { admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      {/* <div>{`Logged In: ${admin.loggedIn}`}</div> */}
      <div className={user.loggedIn ? "log-admin-buttons" : ""}>

        <button className={admin.loggedIn ? "button-login-hide" : "button-login"}
          onClick={() => {
            if (admin.loggedIn) return;
            setAdmin({ loggedIn: true });
            navigate(`/`)


            //If commented in, if we try to go to a protected page when logged out, and then we log in, it goes automatically there.
            // if (location.state?.from) {
            //   navigate(location.state.from);
            // }
          }}
        >
          Log In As Admin
        </button>


        <button className={admin.loggedIn ? "button-logout" : "button-logout-hide"}
          onClick={() => {
            if (!admin.loggedIn) return;
            setAdmin({ loggedIn: false });
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LogInAdminButtons;