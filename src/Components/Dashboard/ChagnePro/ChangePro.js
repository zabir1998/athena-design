import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Dashboard from '../Dashboard';
import { loggedInInfo } from '../../Login/loginManager';
import { Avatar } from '@material-ui/core';

const ChangePro = () => {
    const [change, setChange] = useState([]);
    const [redirect, setRedirect] = useState();

    // Database
    useEffect(() => {
        fetch("https://athena-server-site.herokuapp.com/getReview")
            .then(res => res.json())
            .then(data => {
                setChange(data)
                setRedirect(true)
            })
    }, [redirect]);

    return (
        <section className="mr-3">
            <div className="row">
                <div className="col-md-3">
                    <Dashboard></Dashboard>
                </div>
                <div className="col-md-9 pl-4 pr-4 mt-5">
                    <div className="container mb-5" id="review">
                        {change.length === 0 && <h1 align="center"> Please Wait......... </h1>}
                        <h3 align="center"><b> Project Changing <strong className="text-danger"> Messages </strong></b></h3>
                        <div className="d-flex justify-content-center mt-3">
                            <div className="mx-auto w-100 row mt-2 pt-4">
                                {
                                    change.map(change => <div className="col-md-4" change={change} key={change._id}>

                                        <div style={{ borderRadius: '5px' }} className="m-1 border border-1 p-4">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <Avatar src={change.photo} alt="U"></Avatar>
                                                <div>
                                                    <h5 className="ml-3"><strong>{change.name}</strong> </h5>
                                                    <small className="ml-3"> {change.email}</small></div>
                                            </div> <br/>
                                            <p className="text-secondary">{change.desc}</p>
                                        </div>

                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ChangePro;