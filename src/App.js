import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from 'firebase/auth';
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
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
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
          </div>
          : <button onClick={handleSignOut}>Sign Out</button>
      }

      <div>
        <h1>Got You!</h1>
        <h2>Name: {user.name}</h2>
        <p> I know your Email address: {user.email} </p>
        <img src={user.photo} alt="" />
      </div>
    </div>
  );
}

export default App;
