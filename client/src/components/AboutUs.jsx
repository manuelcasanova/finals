import { Fragment } from 'react'
import './styling/aboutus.css'

export default function AboutUs () {
  return (
<Fragment>
<div className='aboutus-component'>
  <h1 className="header"> About ToolSwap 🧰</h1>
  <h2 className="intro">Why let your tools waste in your garage if your neighbour could use them? Why clutter your shed with tools that get used only occasionally if you could borrow them for that one job you need to get done. There is no need to spend money on individual ownership if your needs could be met through sharing the resources we have as a community.
  </h2>
  <h2 className="intro">Whether you are an apartment dweller or a two-story residence owner Tool Swap is for you! We offer a web-based inventory tracking system allowing you to view, add, track and book tools from the comfort of your own home. Our goal is to strengthen local neighbourhood groups and limit barriers to tool access.</h2>
</div>

<div className='team-component'>
  <h1 className="header"> Our team 🫶 </h1>
    <div className='team'>
    <div class="team-picture"><a href="#"> <img src="https://github.com/manuelcasanova/finals/blob/kr/about_us/server/images/IMG_0317.jpeg?raw=true" alt="team image" width="100%" /> </a></div>
    <div className="team-bio"><p>Nova Scotia-based hacker mom. In the past felt overwhelmed with all the tools she acquired to complete DIYs projects found on Pinterest. Currently, she is a happy minimalist believing in access over ownership philosophy.</p></div>
      
    </div>

    <div className='team'>
      
    </div>

    <div className='team'>
      
    </div>
</div>
</Fragment>
  )

}