import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import NavBar from './components/navbar';

import Header from './components/header';

import Workout from './pages/workout';
import Profile from './pages/profile';
import { useAuth } from "react-oidc-context";
import LogButton from './components/logbutton';
import { Button} from '@mantine/core';

function App() {

  return (
      <Router>
        <div>
          <Header />
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
