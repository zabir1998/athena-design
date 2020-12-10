import React, { useEffect, useState } from 'react';
import DedicatedCard from './DedicatedCard';


const Services = () => {
    const [services, setServices] = useState([]);
    const [redirect, setRedirect] = useState();
    
    // Database
    useEffect(() =>{
        fetch("https://athena-server-site.herokuapp.com/services")
        .then(res => res.json())
        .then(data => {
            setServices(data)
            setRedirect(true)
        })
    }, [redirect]);
    
    return (
        <div className="container" id="service">
            {services.length === 0 && <h1 align="center"> Please Wait......... </h1>} <br/>
            <h3 align="center"><b> Provide awesome <strong className="text-danger"> services </strong> </b></h3>
            <div className="d-flex justify-content-center">
                <div className="mx-auto w-100 row mt-2 pt-5">
                    {
                        services.map(service => <DedicatedCard service={service} key={service.name}></DedicatedCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;