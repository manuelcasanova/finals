

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

export default function Authentication () {
  return (
    <div className="authentication">
    <div className="authentication-left">
     <a href="/"><div className="logo">Tool swap</div></a> 
    </div>
    <div className="authentication-right">
      <div className="login-as-user"><LogInButtons /></div>
      <div className="login-as-admin">Login as admin</div>
    </div>
  </div>
  )
}
