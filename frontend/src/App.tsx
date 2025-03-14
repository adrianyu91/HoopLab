import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Workout from './components/workout';
import './App.css';
import { useAuth } from "react-oidc-context";


function App() {
  
  const auth = useAuth();
  const items = ["Home", "Workout", "Contact"];

  useEffect(() => {
    if (!auth.isLoading) {
      console.log("User is authenticated:", auth.isAuthenticated);
      console.log("User info:", auth.user?.profile.email);
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  // if (auth.isAuthenticated) {
  //   return (
  //     <div>
  //       <pre> Hello: {auth.user?.profile.email} </pre>
  //       <pre> ID Token: {auth.user?.id_token} </pre>
  //       <pre> Access Token: {auth.user?.access_token} </pre>
  //       <pre> Refresh Token: {auth.user?.refresh_token} </pre>

  //       <button onClick={() => auth.removeUser()}>Sign out</button>
  //     </div>
  //   );
  // }
  

  return (
      <Router>
        <div>
          
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
          <button onClick={() => auth.signoutRedirect()}>Sign out</button>
          <NavBar 
            brandName="HoopLab" 
            imageSrcPath={''} 
            navItems={items}
          />
          <Routes>
            <Route path="/workout" element={<Workout />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
