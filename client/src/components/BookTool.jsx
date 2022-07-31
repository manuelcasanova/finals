export default function BookTool({ user, tools, toolIdParam }) {

  console.log(tools, toolIdParam)

  const email = tools[toolIdParam].user_email;

  console.log(email)

  return (


    <a href={`mailto:${email}`}>
      <div className={user.loggedIn ? "one-item-book" : "hide"}>
        <button className="button-book">Book</button>
      </div>
    </a>



  )
}
