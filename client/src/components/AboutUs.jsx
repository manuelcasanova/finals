import { Fragment } from "react";
import "./styling/aboutus.css";

export default function AboutUs() {
  return (
    <Fragment>
      <div className="aboutus-component">
        <h1 className="header"> About ToolSwap 🧰</h1>
        <p className="intro">
          🔨Why let your tools waste in your garage if your neighbour could use
          them? <br></br>
          ⚒️ Why clutter your shed with tools that get used only occasionally
          if you could borrow them for that one job you need to get done. <br></br>
          😁There is no need to spend money on individual ownership if your needs could
          be met through sharing the resources we have as a community.
        </p>
        <p className="intro">
          Whether you are an apartment dweller or a two-story residence owner
          Tool Swap is for you! We offer a web-based inventory tracking system
          allowing you to view, add, track and book tools from the comfort of
          your own home. Our goal is to strengthen local neighbourhood groups
          and limit barriers to tool access.
        </p>
      </div>

      <div className="team-component">
        <h1 className="header"> Our team 🫶 </h1>
        <div className="team">
          <div class="team-picture">
            <a href="#">
              {" "}
              <img
                src="https://github.com/manuelcasanova/finals/blob/kr/about_us/server/images/IMG_0317.jpeg?raw=true"
                alt="team image"
                width="100%"
              />{" "}
            </a>
          </div>
          <div className="team-bio">
            <p className="team-names">Karolina Redden</p>
            <p>
              Nova Scotia-based hacker mom. In the past felt overwhelmed with
              all the tools she acquired to complete DIYs projects found on
              Pinterest. Currently, she is a happy minimalist believing in
              access over ownership philosophy.
            </p>
          </div>
        </div>

        <div className="team">
          <div class="team-picture">
            <a href="#">
              {" "}
              <img
                src="https://raw.githubusercontent.com/manuelcasanova/finals/kr/about_us/server/images/liam.jpg"
                alt="team image"
                width="100%"
              />{" "}
            </a>
          </div>
          <div className="team-bio">
          <p className="team-names">Liam Smith</p>
            <p>
              Toronto based, socialist(-ish) coder dad. Owns too much stuff to
              be a true socialist so would like to lend his crockpot, or
              anything else he has because seriously, this stuff barely gets
              used. When not at his desk, can be found in the woods searching
              for mushrooms.
            </p>
          </div>
        </div>

        <div className="team">
          <div class="team-picture">
            <a href="#">
              {" "}
              <img
                src="https://github.com/manuelcasanova/finals/blob/kr/about_us/server/images/IMG-20201031-WA0036_edited.jpg?raw=true"
                alt="team image"
                width="100%"
              />{" "}
            </a>
          </div>
          <div className="team-bio">
          <p className="team-names">Manuel Casanova</p>
            <p>
              Vancouver-based full-stack developer. He used to teach Spanish and
              manage hotels but, the truth is that -besides coding- all he wants
              to do is dance to Cuban/Dominican music and emulate his idols
              climbing mountains with a road bike.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
