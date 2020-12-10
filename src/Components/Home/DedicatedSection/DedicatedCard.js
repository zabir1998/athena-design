import React from 'react';
import { Link } from 'react-router-dom';
import './DedicatedCard.css';

const DedicatedCard = ({ service }) => {
    return (
        <div className="col-lg-3 text-center box-style-price mb-2 p-5">
            <div>
                <h1>${service.price}</h1>
                <p>{service.name}</p>
                <hr />
                <p>Home Page</p>
                <p>{service.innerPage} Inner Page</p>
   
                <p>Asset File</p>
                <p>Free Stock Photos</p>
                <p>{service.daySupport} days free Support</p>
                <p>24/7 Support</p>
                <br />
                <Link to={`/purchase/${service._id}`}><button className="button-style">Order Now</button></Link>
            </div>
        </div>
    );
};

export default DedicatedCard;