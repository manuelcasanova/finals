import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";

const LogInAdminButtons = () => {
  const { admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div>{`Logged In: ${admin.loggedIn}`}</div>
      <div>

        <button className={admin.loggedIn ? "button-login-hide" : "button-login"}
          onClick={() => {
            if (admin.loggedIn) return;
            setAdmin({ loggedIn: true });

            if (location.state?.from) {
              navigate(location.state.from);
            }
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