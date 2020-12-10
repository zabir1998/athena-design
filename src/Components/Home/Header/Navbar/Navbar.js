import React, { useContext } from 'react';
import './Navbar.css';
import menu from '../../../../images/menu.png';
import logo from '../../../../images/logos/logo.png'
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { handleSignOut, isLoggedIn, loggedInInfo } from '../../../Login/loginManager';
import { UserContext } from '../../../../App';

const Navbar = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
      // is logged in
  const isLogged = isLoggedIn();

  // Handle sign out button
  const signOut = () => {
    setLoggedInUser({});
    sessionStorage.removeItem('token');
  };

  const loggedUser = loggedInInfo()

    return (
        <div className="container mb-2">
            <nav className="navbar navbar-expand-lg  nav-font">
                <p className="navbar-toggler bgMenu w-40 p-2 pl-3 pr-3 ml-auto mt-4" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    
                </p>
                <div className="collapse navbar-collapse " id="navbarNav">
                    
                        <Link to="/"><img style={{ width: "100px" }} src={logo} alt=""/></Link>
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item active mr-3 p-1">
                            <a href="/home" className="nav-link text-dark">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item mr-3 p-1">
                            <a className="nav-link text-dark" href="#carousel">Our Portfolio</a>
                        </li>
                        <li className="nav-item mr-3 p-1">
                            <a className="nav-link text-dark" href="#service">Our Service</a>
                        </li>
                        <li className="nav-item mr-3 p-1">
                            <a className="nav-link text-dark" href="#review">Review</a>
                        </li>
                        <li className="nav-item mr-3 p-1">
                            <a className="nav-link text-dark" href="#footer">Contact Us</a>
                       
                        </li>
                        
                      <div className="resLogBtn">
                      {
                loggedInUser.email || isLogged ? <button className="nav-item btn px-4 h-75 btnLogin" onClick={signOut}>Sign Out, {loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</button> :
                  <Link to="/login"><button className="nav-item btn px-4 h-75 btnLogin">Sign In</button></Link>
              }
              {loggedInUser.email || isLogged ? <Link style={{textDecoration: "none"}} to="/admin_user"> <button className="nav-item btn px-4 h-75 btnDash">Dashboard</button> </Link> : ""}
                       
                          </div>
                    
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;