import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Dashboard from '../Dashboard';
import './AdminAddService.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UserContext } from '../../../App';
import { loggedInInfo } from '../../Login/loginManager';


const AdminAddService = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const loggedUser = loggedInInfo();
    const { register, handleSubmit, errors } = useForm();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const history = useHistory();
    const onSubmitEvent = () => {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('name', info.name);
        formData.append('innerPage', info.innerPage);
        formData.append('daySupport', info.daySupport);
        formData.append('price', info.price);

        fetch('https://athena-server-site.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => {
                console.error(error)
            })
            .then(data => {
                if(data){
                    document.getElementById("serviceUp").innerHTML = `New Service Has been added to the <a href="/#service"> Homepage <a>`;
                }
            })
    };

    return (
        <section className="mr-3">

            <div className="row ">
                <div className="col-md-3">
                    <Dashboard></Dashboard>
                </div>
                <div className="col-md-9 pl-4 pr-4 mt-5">
                    <div className="d-flex justify-content-between">
                    <h4 className="bg-white">Add Service</h4>
                    <h4>{loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}</h4>
                    </div>
                    <div className="adminService p-4">
                        <form action="" onSubmit={handleSubmit(onSubmitEvent)}>
                            <section className="addServiceSec">
                                <div className="row p-4">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <div className="input-group-prepend">
                                                <b> Service Title </b>
                                            </div>
                                            <input onBlur={handleBlur} className="w-100 mx-auto form-control" name="name" placeholder="Enter title" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">This field  is required</span>}
                                        </div>

                                        <div className="mb-3">
                                            <div className="input-group-prepend">
                                                <b> No of Inner Page </b>
                                            </div>
                                            <input onBlur={handleBlur} className="w-100 mx-auto form-control" name="innerPage" type="number" placeholder="** Inner Page" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">This field is required</span>}
                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                    <div className="mb-3">
                                            <div className="input-group-prepend">
                                                <b> Price </b>
                                            </div>
                                            <input onBlur={handleBlur} className="w-100 mx-auto form-control" name="price" type="number" placeholder="Price" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">This field is required</span>}
                                        </div>

                                        <div className="mb-3">
                                            <div className="input-group-prepend">
                                                <b> Free Support Days </b>
                                            </div>
                                            <input onBlur={handleBlur} className="w-100 mx-auto form-control" name="daySupport" type="number" placeholder="** days free Support" ref={register({ required: true })} />
                                            {errors.eventName && <span className="error">This field is required</span>}
                                        </div>

                                        
                                    </div>
                                </div>
                            </section>
                            <div className=" d-flex justify-content-end mt-2">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                        <b id="serviceUp"></b>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminAddService;