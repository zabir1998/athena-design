import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Dashboard from '../Dashboard';
import { loggedInInfo } from '../../Login/loginManager';

const AdminMaker = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [admin, setAdmin] = useState({});
    const loggedUser = loggedInInfo();

    const handleBlur = e => {
        const newAdmin = { ...admin };
        newAdmin[e.target.name] = e.target.value;
        setAdmin(newAdmin);
    }

    const onSubmitEvent = () => {
        const formData = new FormData()
        formData.append('email', admin.email);

        fetch('https://athena-server-site.herokuapp.com/addAdmin', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if(data){
                    document.getElementById("adminUp").innerText = "Admin has been updated successfully";
                }
            })
            .catch(error => {
                console.error(error)
            })
    };

    return (
        <section className="mr-3">
            <div className="row">
                <div className="col-md-3">
                    <Dashboard></Dashboard>
                </div>
                <div className="col-md-9 pl-4 pr-4 mt-5">
                <div className="d-flex justify-content-between">
                    <h4 className="bg-white">Add Admin</h4>
                    <h4>{loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</h4>
                    </div>
                    <div className="adminService p-4">
                        <form action="" onSubmit={handleSubmit(onSubmitEvent)}>
                            <section style={{ height: "285px" }} className="addServiceSec">
                                <div className="mb-3 p-4">
                                    <div className="input-group-prepend">
                                        <b> Service Title </b>
                                    </div>
                                    <div className="d-flex justify-content-start">
                                        <input onBlur={handleBlur} className="w-50 form-control mr-2" name="email" placeholder="Enter title" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Email is required</span>}
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </div>
                                    <b id="adminUp"></b>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default AdminMaker;