

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

export default function Authentication () {

  const { user, setUser } = useContext(UserContext);
  const { admin, setAdmin } = useContext(UserContext);

  return (
    <div className="authentication">
    <div className="authentication-left">
     <a href="/"><div className="logo">Tool swap</div></a> 
    </div>
    <div className="authentication-right">
      {/* <div className="login-as-user"><LogInButtons buttonText={"Log in as user"} userId={1}/></div>
      <div className="login-as-admin"><LogInButtons buttonText={"Log in as admin"} userId={2}/></div> */}
      <div className="login-as-user"><LogInButtons user={user} setUser={setUser} admin={admin} setAdmin={setAdmin}/></div>
      <div className="login-as-admin"><LogInAdminButtons user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} /></div>
    </div>
  </div>
  )
}
