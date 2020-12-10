import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import './Price.css';

const Price = () => {

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
       <div className="price">
            <div className="container">
                <h2 style={{textAlign:"center"}}>Choose Your Dedicated Team</h2>


                <CardDeck className="mx-auto w-100 row mt-2 pt-5">
                    {
                        services.map(service => <Card className="table" service={service} key={service.name}>

                         
          <Card.Body className="tr">
            <Card.Title><h3 style={{textAlign:"center"}}>${service.price}</h3><p style={{textAlign:"center"}}>For Basic</p></Card.Title>
            <Card.Text>
             <ul>Homepage</ul>
             <ul>No Inner Page</ul>
             <ul>Asset Page</ul>
             <ul>Free Photos</ul>
             <ul>10 Days Support</ul>
             <ul>24/7 Support</ul>
             <ul><button className="btnHire">Contact</button></ul>
            </Card.Text>
          </Card.Body>
        

                        </Card>)
                    }
                </CardDeck>

        


        
        </div>

       </div>
    );
};

export default Price;