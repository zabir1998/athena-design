import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import AdminControl from './Components/Dashboard/AdminControl/AdminControl';
import Login from './Components/Login/Login';
import AdminAddService from './Components/Dashboard/AdminAddService/AdminAddService';
import AdminMaker from './Components/Dashboard/AdminMaker/AdminMaker';
import OrderService from './Components/Dashboard/OrderService/OrderService';
import ServiceList from './Components/Dashboard/ServiceList/ServiceList';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Review from './Components/Dashboard/Review/Review';
import Purchase from './Components/Purchase/Purchase';
import { loggedInInfo } from './Components/Login/loginManager';
import ChangePro from './Components/Dashboard/ChagnePro/ChangePro';

export const UserContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const loggedUser = loggedInInfo();
  useEffect(() => {
    fetch(`https://athena-server-site.herokuapp.com/findAdmin/${loggedInUser.email || loggedUser.email && loggedInUser.email || loggedUser.email}`)
      .then(res => res.json())
      .then(data => {
        setAdmin(data);
        // setRedirect(true)
      })
  }, [loggedInUser.email || loggedUser.email && loggedInUser.email || loggedUser.email]);



  console.log(loggedInUser);
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" >
                <Home></Home>
              </Route>
              <Route path="/home" >
                <Home></Home>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              
              <PrivateRoute exact path="/admin_user" >
                {admin ? <AdminControl></AdminControl> : <ServiceList></ServiceList>}
              </PrivateRoute>

              {admin ? (<div>
                <PrivateRoute exact path="/dashboard/:_id">
                  <AdminControl></AdminControl>
                </PrivateRoute>
                <PrivateRoute exact path="/adminControl" >
                  <AdminControl></AdminControl>
                </PrivateRoute>
                <PrivateRoute exact path="/adminAddService">
                  <AdminAddService></AdminAddService>
                </PrivateRoute>
                <PrivateRoute exact path="/changePro">
                  <ChangePro></ChangePro>
                </PrivateRoute>
                <PrivateRoute exact path="/adminMaker">
                  <AdminMaker></AdminMaker>
                </PrivateRoute> </div>) :

                (<div>
                  <PrivateRoute path="/purchase/:_id">
                <Purchase></Purchase>
              </PrivateRoute>
                  <PrivateRoute exact path="/dashboard/:_id">
                    <OrderService></OrderService>
                  </PrivateRoute>
                  <PrivateRoute exact path="/orderService" >
                    <OrderService></OrderService>
                  </PrivateRoute>
                  <PrivateRoute exact path="/userService" >
                    <ServiceList></ServiceList>
                  </PrivateRoute>
                  <PrivateRoute exact path="/userReview" >
                    <Review></Review>
                  </PrivateRoute>
                </div>)}

            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
