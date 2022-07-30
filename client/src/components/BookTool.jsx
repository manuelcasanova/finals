export default function BookTool ({user}) {
  return (
    <div className={user.loggedIn ? "one-item-book" : "hide"}>
      <button className="button-book">Book item</button>
    </div>
  )
}
