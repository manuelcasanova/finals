// import { useEffect } from "react";

// export default function BookTool({ user, admin, tools, toolIdParam }) {

//   // console.log(tools, toolIdParam, tools.find((t) => { return t.tool_id === Number(toolIdParam)}))

  
//   const foundTool = tools.find((t) => { return t.tool_id === Number(toolIdParam)})
//   const email = foundTool.user_email;

//   // console.log(email)

//   return (


//     <a href={`mailto:${email}`}>
//       <div className={user.loggedIn || admin.loggedIn ? "one-item-book" : "hide"}>
//         <button className="button-book">Book</button>
//       </div>
//     </a>



//   )
// }
