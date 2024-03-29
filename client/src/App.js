import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

  return (
    <>
      <div>
        <Routes>
          <Route path='*' element={<Home />} />
          {!isUserSignedIn || (isUserSignedIn.length === 0) ?
            (<>
              <Route path='/' element={<Home />} />
              <Route path='/sendotp' element={<CreateAccount />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </>)
            :""}
            <Route path='/dashboard' element={isUserSignedIn ? <Dashboard /> : <Login/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
