import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//CSS
import './styling/registration.css'

// import axios from './api/axios'
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z][a-zA-A0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USEREMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//End point for our registration in our backend API
const REGISTER_URL = '/register'

export default function Register() {

  const navigate = useNavigate();

  //useRef references. Set the focus on the user input when the component loads.
  //If error we set the focus on it so it can be readed by a screen reader fo accesibility
  const userRef = useRef();
  const errRef = useRef();

  //State for the user state

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //State for the email
  const [userEmail, setUserEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //State for the password field

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //State for the matching password fields

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //State for possible error message

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //Use effect hook. Set the focus when the component loads.

  useEffect(() => {
    userRef.current.focus()
  }, [])

  //Validate the user name. Anytime it changes, it will check the validation.

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result)
  }, [user])

  //Validate the user email. Anytime it changes, it will check the validation.

  useEffect(() => {
    const result = USEREMAIL_REGEX.test(userEmail);
    // console.log(result);
    // console.log(userEmail);
    setValidEmail(result)
  }, [userEmail])

  //Validate the password. The confirmation is defined by match. We set wether we have a valid match or not. It's on sync with the password field at all times.

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd
    setValidMatch(match);
  }, [pwd, matchPwd])

  //Error message. If we display it, besides showing it, anytime we set the state of the dependencies in the array, we want to clear the error message, because the user has read the error message and made changes.

  useEffect(() => {
    setErrMsg('');
  }, [user, userEmail, pwd, matchPwd])

  function resetForm() {
    setUser('');
    setUserEmail('');
    setPwd('');
    setMatchPwd('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userObject = {
      user,
      userEmail,
      pwd
    };
    // if button enabled with JS hack we check again and we avoid a user to be set in our database with invalid information
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = USEREMAIL_REGEX.test(userEmail);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    addUser(userObject);
    // console.log(userObject)
    resetForm();
    // navigate('/');


    //If there is no connection to db, just for testing, comment in the next two lines
    // console.log(user, pwd, userEmail);
    // setSuccess(true);
  }


  //There's a couple of addUser functions below. This is the one I made work the intended way.

  function addUser(userObject) {

    //Get all the users from the db
    return axios.get(`http://localhost:8001/users`).then((response) => {
      const getUsers = response.data;
      // console.log("all users", getUsers)

      //Check if any user in the db has the same name as the userObject we are trying to post.
      const foundUser = getUsers.find((oneUser) => {
        return oneUser.user_name === user
      });
      if (foundUser) {
        setErrMsg('Username Already Taken')
      }
      //Check if any user in the db has the same email as the userObject we are trying to post.
      const foundEmail = getUsers.find((user) => {
        return user.user_email === userEmail
      });
      if (foundEmail) {
        setErrMsg('Email Already Taken')
      }
      //Post the new user to the db if the checks pass
    }).then((response) => {

      //I am not sure why this is not working as intended. It does the POST REQUEST, but it does not receive a response. Network tab shows "pending" Lines 162 and 163 do not work.
      return axios.post(`http://localhost:8001/users`, userObject)
        .then((response) => {
          const newUser = response.data;
          console.log("new user", newUser)
          navigate('/')
        })
    })
  }


  // function addUser(userObject) {
  //   try {
  //   return axios.post(`http://localhost:8001/users`, userObject).then((response) => {
  //     const newUser = response.data;
  //     console.log("new user", newUser)
  //   })
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg('No Server Response')
  //     } else if (err.response?.status === 409) {
  //       setErrMsg('Username or Email Already Taken')
  //     } else {
  //       setErrMsg('Registration Failed')
  //     }
  //     errRef.current.focus();
  //   }
  // }

  //Just to show how the error looks
  // function addUser(userObject) {
  //   setErrMsg('This is a fake forced error')
  // }



  // function addUser(userObject) {
  //   // console.log("userObject", userObject)
  //   // console.log("user", user)
  //   // console.log("user email", userEmail)
  //   // console.log("pwd", pwd)

  //   return axios.post(`http://localhost:8001/users`, userObject).then((response) => {
  //     const newUser = response.data;
  //     console.log("new user", newUser)
  //   })
  // }








  return (
    <div className="app-registration">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (


        <section>
          {/* Holds the error if exists. Offscreen is different from display:none, which would remove it from the document. Assertive: When we focus in this element, it will be announced with the screen reader */}
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>



            <label htmlFor="userEmail">
              Email:
              <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validEmail || !userEmail ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="userEmail"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="uidnote" className={emailFocus && userEmail && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email address.<br />
              Must include @
            </p>


            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            {/* Disabled until all fields validate */}
            <button className="button-sign-up" disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>

          </form>

          <p>
            Already registered?<br />
            <span className="line">
              {/*put react router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
          {/* <div>States: {user} {userEmail} {pwd} {matchPwd}</div> */}
        </section>
      )}
    </div>
  )
}