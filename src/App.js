import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signOut, GithubAuthProvider } from 'firebase/auth';
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState([]);
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;

        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })
  }

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }

        setUser(loggedInUser);
      })
  }
  const handleTwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then(result => {
        console.log(result.user);
        // const { displayName, email, photoURL } = result.user;
        // const loggedInUser = {
        //   name: displayName,
        //   email: email,
        //   photo: photoURL
        // }

        // setUser(loggedInUser);
      })
  }
  const handleSignOut = () => [
    signOut(auth).then(
      setUser([])
    )
  ]
  return (
    <div className="App">
      {
        !user.name ?
          <div>
            <h2>Sign in With: </h2>
            <button style={{ marginRight: '20px' }} onClick={handleGoogleSignIn}>
              <img width="50px" height="50px" src="https://w7.pngwing.com/pngs/937/156/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-service-thumbnail.png" alt="Google Sign In" />
            </button>
            {/* <button onClick={handleTwitterSignIn}>Twitter Sign In</button> */}
            <button onClick={handleGitHubSignIn}>
              <img width="50px" height="50px" src="https://icons-for-free.com/iconfiles/png/512/part+1+github-1320568339880199515.png" alt="" />
            </button>
          </div>
          : <button onClick={handleSignOut}>Sign Out</button>
      }

      {
        user.name && <div>
          <h1>Got You!</h1>
          <h2>Name: {user.name}</h2>
          <p> I know your Email address: {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
