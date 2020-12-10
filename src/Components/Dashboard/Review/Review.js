import { Avatar } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory} from 'react-router-dom';
import { UserContext } from '../../../App';
import Dashboard from '../Dashboard';
import { loggedInInfo } from '../../Login/loginManager';

const Review = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const loggedUser = loggedInInfo();
    const [admin, setAdmin] = useState({});
    const history = useHistory();
    

    const handleBlur = e => {
        const newAdmin = { ...admin };
        newAdmin[e.target.name] = e.target.value;
        setAdmin(newAdmin);
    }

    const onSubmitEvent = () => {
        const formData = new FormData()
        formData.append('name', loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName);
        formData.append('email', loggedInUser.email || loggedUser.email);
        formData.append('desc', admin.desc);
        formData.append('photo', loggedInUser.photo);

        fetch('https://athena-server-site.herokuapp.com/review', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if(data){
                    document.getElementById("changeUp").innerText = "Your message has been successfully sent to the Admin";
                }
            })
            .catch(error => {
                // console.error(error)
            })
    };

    return (
        <section className="mr-3">

            <div className="row">
                <div className="col-md-3">
                    <Dashboard></Dashboard>
                </div>
                <div className="col-md-8 pl-4 pr-4 mt-5">
                <div className="d-flex justify-content-between">
                    <h4 className="bg-white">Add Review</h4>
                    <h4>{loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</h4>
                    </div>
                    <div className="adminService p-4">
                        <form action="" onSubmit={handleSubmit(onSubmitEvent)}>
                            <section className="orderServe mt-5">
                                
                                <Avatar src={loggedInUser.photo}></Avatar> <br/>

                                        <div className="mb-3">
                                            <input style={{border: "none"}}  value={loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName} onBlur={handleBlur} className="w-100 mx-auto form-control" name="name" placeholder="Your Name" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">Name is required</span>}
                                        </div>

                                        <div className="mb-3">
                                            <input style={{border: "none"}} value={loggedInUser.email || loggedUser.email} onBlur={handleBlur} className="w-100 mx-auto form-control" name="email" placeholder="Email" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">Email is required</span>}
                                        </div>

                                        <div className="mb-3">
                                            <textarea style={{ height: "120px", width: "100%", border: "none" }} onBlur={handleBlur} className="w-100 mx-auto form-control" name="desc" placeholder="Project Details" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">Description is required</span>}
                                        </div>

                                        <button style={{ backgroundColor: "#111430", textDecoration: "none", color: "white", fontSize: "12px" }} className="btn btnLogin w-25 p-3" type="submit">Send</button>
                                
                            </section>
                                
                        </form>
                        <b id="changeUp"></b>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;