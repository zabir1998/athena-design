import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RateReviewIcon from '@material-ui/icons/RateReview';
import logo from '../../images/logos/logo.png';
import './Dashboard.css';
import { UserContext } from '../../App';
import { loggedInInfo } from '../../Components/Login/loginManager';
import AutorenewIcon from '@material-ui/icons/Autorenew';

// Material UI elements
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [admin, setAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const loggedUser = loggedInInfo();

  useEffect(() => {
    fetch(`https://athena-server-site.herokuapp.com/findAdmin/${loggedInUser.email || loggedUser.email && loggedInUser.email || loggedUser.email}`)
      .then(res => res.json())
      .then(data => {
        setAdmin(data);
        // setRedirect(true)
      })
  }, [loggedInUser.email || loggedUser.email && loggedInUser.email || loggedUser.email]);

  const signOut = () => {
    setLoggedInUser({});
    sessionStorage.removeItem('token');
  };


  return (

    <div class="bgSidebar h-100">
      <div className="d-flex justify-content-center pt-5"> <Link to="/">
        <img style={{ width: "140px" }} src={logo} alt="" /></Link>
      </div>
      <div className="text-center">
        <small>Click on icon to go Home</small>
      </div>
      {/* Admin Panel */}

      { admin ? (<admin className="d-flex justify-content-center">
        <div className="mt-3 p-2">
          <List className={`${classes.root}`}>
            <Link style={{ textDecoration: "none" }} to="/adminControl">
              <div className=" btn btn-light pt-3  d-flex justify-content-start btnDashboard">
                <RoomServiceIcon></RoomServiceIcon>
                <p className="ml-2">User Service List</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/adminAddService">
              <div className=" btn btn-light mt-3 pt-3  d-flex justify-content-start btnDashboard">
                <AddIcon></AddIcon>
                <p className="ml-2">Add New Service</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/changePro">
              <div className=" btn btn-light mt-3 pt-3  d-flex justify-content-start btnDashboard">
                <AutorenewIcon></AutorenewIcon>
                <p className="ml-2">Changing Project</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/adminMaker">
              <div className=" btn btn-light mt-3 pt-3  d-flex justify-content-start btnDashboard">
                <PersonAddIcon></PersonAddIcon>
                <p className="ml-2">Make an Admin</p>
              </div>
            </Link>
          </List>
        </div>
      </admin>) :


        (<user className="d-flex justify-content-center">
          <div className="mt-3 p-2">
            <List className={classes.root}>
              
              <Link style={{ textDecoration: "none" }} to="/userService">
                <div className=" w-100 pt-3 btn btn-light d-flex justify-content-start btnDashboard">
                  <RoomServiceIcon></RoomServiceIcon>
                  <p className="ml-2">My Service List 🛠</p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/userReview">
                <div className=" btn btn-light mt-3 pt-3 d-flex justify-content-start btnDashboard">
                  <RateReviewIcon></RateReviewIcon>
                  <p className="ml-2">Change Project 🤒</p>
                </div>
              </Link>
            </List>
          </div>
        </user>)}
        <div className="text-center"><button className="btn btn-warning" onClick={signOut}>Sign Out</button></div> <br/>

    </div>
  );
};

export default Dashboard;