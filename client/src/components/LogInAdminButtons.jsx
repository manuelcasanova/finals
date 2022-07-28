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

{/* if user logged in hide, else show */}

      <button className="button-login"
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

{/* if user logged out hide, else show */}

        <button className="button-login"
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