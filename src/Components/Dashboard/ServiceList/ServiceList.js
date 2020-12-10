import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Dashboard from '../Dashboard';
import { loggedInInfo } from '../../Login/loginManager';
import Navbar from '../../Home/Header/Navbar/Navbar';

const ServiceList = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const loggedUser = loggedInInfo();

    const [redirect, setRedirect] = useState();

    // Individual data for every user
    useEffect(() => {
        fetch(`https://athena-server-site.herokuapp.com/orders?email=${loggedInUser.email || loggedUser.email && loggedInUser.email || loggedUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setOrders(data)
                    setRedirect(true)
                }
            })
    }, [redirect]);
    return (
        <section className="mr-3">
            <div className="row ">
                <div className="col-md-3">
                    <Dashboard></Dashboard>
                </div>
                <div className="col-md-8 pl-4 pr-4 mt-5">
                    <div className="d-flex justify-content-between">
                        <h4 className="bg-white">Service List</h4>
                        <h4>{loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</h4>
                    </div>
                    <div className="adminService p-4">
                        {orders.length === 0 && <h5 align="center">Loading..........Or, You didn't order anything</h5>}
                        <div style={{ borderRadius: "20px" }} className="bg-white p-3">
                            <div className="table-responsive">
                                <table className="table bg-white table-borderless serveListBg" id="changed">
                                    <thead className=" p-2">
                                        <tr className=" p-2">
                                            <th scope="col">Name</th>
                                            <th scope="col">Email ID</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order =>
                                                <tr key={order._id}>
                                                    <td>{order.name}</td>
                                                    <td>{order.email}</td>
                                                    <td>{order.service}</td>
                                                    <td>{order.price}</td>
                                                    <td>
                                                    <p className="btn btn-dark">{order.status ? order.status : "Pending"}</p>

                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceList;