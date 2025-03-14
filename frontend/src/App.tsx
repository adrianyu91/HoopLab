import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Workout from './pages/workout';
import Profile from './pages/profile';
import './App.css';
import { useAuth } from "react-oidc-context";
import LogButton from './components/logbutton';

function App() {
  
  
  const auth = useAuth();

  let items = ["Home", "Workout", "Contact"];
  if (auth.isAuthenticated && auth.user?.profile.name) {
    items = ["Home", "Workout", "Contact", auth.user.profile.name];
  }

  return (
      <Router>
        <div>
          <LogButton />
          <NavBar 
            brandName="HoopLab" 
            imageSrcPath={''} 
            navItems={items}
          />
          <Routes>
            <Route path="/workout" element={<Workout />} />
            <Route path="/user/:username" element={<Profile />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
