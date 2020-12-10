import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { loggedInInfo } from '../Login/loginManager';
import Navbar from '../Home/Header/Navbar/Navbar';
import { UserContext } from '../../App';
import Payment from './Payment';

const Purchase = () => {

    const { _id } = useParams();
    const [serve, setServe] = useState([]);

    useEffect(() => {
        fetch(`https://athena-server-site.herokuapp.com/purchase/${_id}`)
            .then(res => res.json())
            .then((data) => {
                setServe(data);
                console.log(data);
            });
    }, [_id])



    const { register, handleSubmit, errors } = useForm();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const {serviceLink} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const loggedUser = loggedInInfo();
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const [shippingData, setShippingData] = useState(null);

    const history = useHistory();
    const onSubmitEvent = (data) => {
        setShippingData(data)
    };
    
    const handlePaySuccess = paymentId => {
        const formData = new FormData()
        // console.log(info);
        formData.append('file', file);
        formData.append('name', info.name || loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName);
        formData.append('desc', info.desc);
        formData.append('email', loggedInUser.email || loggedUser.email);
        formData.append('service', serve.name);
        formData.append('price', serve.price);
        formData.append("paymentId", paymentId);
        

        fetch('https://athena-server-site.herokuapp.com/addOrder', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        // history.push("/userService");
        
    }



    return (
        <section className="purchase">

            <div>
                <Navbar></Navbar>
                
               
                {/* Row */}
                <div className="container"><div className="row">
                    <div className="col-md-3">

                    </div>


                    <div style={{display: shippingData ? 'none' : "block"}} className="col-md-6 purchaseForm">
                    <div className="d-flex justify-content-between">
                    <h4>Order</h4>
                    <h4>{loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</h4>
                    </div>
                    <div className=" p-4">
                    <form action="" onSubmit={handleSubmit(onSubmitEvent)}>
                                <section className="orderServe mt-1">

                                <div className="mb-3">
                                        <input style={{ border: "none" }} value={serve.name} onBlur={handleBlur} className="w-100 mx-auto form-control" name="service" placeholder="Service" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Service name is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <input style={{ border: "none" }} defaultValue={loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName} onBlur={handleBlur} className="w-100 mx-auto form-control" name="name" placeholder="Full Name" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Name is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <input style={{ border: "none" }} value={loggedInUser.email || loggedUser.email} onBlur={handleBlur} className="w-100 mx-auto form-control" name="email" placeholder="Your Email Address" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Email is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <input style={{ border: "none" }} onBlur={handleBlur} className="w-100 mx-auto form-control" type="number" name="phone" placeholder="Phone Number" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Phone number is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <textarea style={{ height: "120px", width: "100%", border: "none" }} onBlur={handleBlur} className="w-100 mx-auto form-control" name="desc" placeholder="Message" ref={register({ required: true })} />
                                        {errors.eventName && <span className="error">Description is required</span>}
                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">
                                            <input style={{ border: "none" }} value={serve.price} onBlur={handleBlur} className="w-100 form-control" name="price" placeholder="Price" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">Price is required</span>}
                                        </div>

                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                        <br/>
                                    <p className="text-danger text-center">Please make sure you have clicked all the input tab before submitting</p>
                                    <button className="btn btnRequest w-100 p-3" type="submit">Purchase Done!</button>

                                </section>

                            </form>
                    </div>
                    </div>


                    <div style={{display: shippingData ? 'block' : "none"}} className="col-md-6">
                        <h4 align="center">Payment</h4>
                        <div className="mt-1 p-4">
                        <Payment handlePay = {handlePaySuccess}></Payment></div>
                    </div>
                    <div className="col-md-3">
                        
                    </div>
                </div></div>
                
            </div>
        </section>
    );
};

export default Purchase;