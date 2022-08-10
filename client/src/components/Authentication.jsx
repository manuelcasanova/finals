

// export default function Authentication () {
//   return (
//     <div className="authentication">
//     <div className="authentication-left">
//      <a href="/"><div className="logo">Tool swap</div></a> 
//     </div>
//     <div className="authentication-right">
//       <div className="login-as-user">Login as user</div>
//       <div className="login-as-admin">Login as admin</div>
//     </div>
//   </div>
//   )
// }

import LogInButtons from "./LogInButtons";
import LogInAdminButtons from "./LogInAdminButtons";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



export default function Authentication() {

  const { user, setUser } = useContext(UserContext);
  const { admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="authentication">
      <div className="authentication-left">
        <a href="/"><div className="logo">Tool Swap</div></a>
      </div>
      <div className="authentication-right">

        {/* <div className="login-as-user">

          <button
            className={user.loggedIn || admin.loggedIn ? "hide" : "button-register"}
            onClick={() => { navigate(`/register`) }}
          >Register</button>

        </div>

        <div className="login-as-user">

          <button
            className={user.loggedIn || admin.loggedIn ? "hide" : "button-register"}
            onClick={() => { navigate(`/login`) }}
          >Log in</button>

        </div> */}


        <div className="login-as-user"><LogInButtons user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} /></div>
        <div className="login-as-admin"><LogInAdminButtons user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} /></div>
      </div>
    </div>
  )
}

