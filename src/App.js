/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FallBack from './Component/FallBack/FallBack.jsx';
import MenuFallBack from './Component/FallBack/MenuFallBack.jsx';
// import { TicketLogin } from "./Component/TicketUser/TicketLogin";
import {UserLogin} from '../src/page/UserLogin.jsx';
import {LandingPage} from './Component/HomePageComp/landingPage.jsx';
// import { MenuDrawer } from "./Component/TicketUser/MenuDrawer";
// import AdminLogin from "./Component/Form";
import HomeAdminSignUp from './page/Home.jsx';

import {Blog} from '../src/page/Blog.jsx';
// import AdminCall from "./Paginations/AdminCall";
import AdminWindow from './Component/AdminComp/AdminDashboard.jsx';
import './App.css';
import AdminLogin from './Component/AdminComp/AdminLogin.jsx';
import {GeneratePass} from './Component/UserComp/GeneratePass.jsx';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticateded, setAuthenticateded] = useState(false);
  const [userData, setUserData] = useState([]);

  return (
    <div>
      <Router
        // eslint-disable-next-line camelcase
        future={{v7_startTransition: true, v7_relativeSplatPath: true}}
      >
        <Routes>
          <Route
            path="/userLogin"
            element={
              <UserLogin setAuthenticateded={setAuthenticateded} setUserData={setUserData} userData={userData} />
            }
          />
          <Route path="/" element={<HomeAdminSignUp setAuthenticated={setAuthenticated} />} />
          <Route path="/adminLogin" element={<AdminLogin setAdminLogin={setAuthenticated} />} />
          <Route path="/admin" element={authenticated ? <AdminWindow /> : <FallBack />} />
          <Route
            path="/landingPage"
            element={
              authenticateded ? (
                <LandingPage userData={userData} setAuthenticated={setAuthenticated} setUserData={setUserData} />
              ) : (
                <MenuFallBack />
              )
            }
          />
          <Route path="/travel-and-explore" element={authenticateded ? <Blog /> : <MenuFallBack />} />
          <Route path="/generateUserPassword" element={<GeneratePass />} />
        </Routes>
      </Router>
      {/* </AuthProvider> */}
      {/* <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        /> */}
    </div>
  );
};

export default App;
