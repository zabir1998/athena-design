import React from 'react';
import logo from '../../../image/Illustration/Group 86.png';
import facebook from '../../../image/Illustration/facebook-logo-in-circular-shape@2x.png';
import twitter from '../../../image/Illustration/twitter (4)@2x.png';
import linkedin from '../../../image/Illustration/linkedin (2)@2x.png';
import dribble from '../../../image/Illustration/dribbble (1)@2x.png';


const Footer = () => {
    return (
        <section class="bg-footer mt-5 p-3">
            <div class="container mt-5">
                <div class="row align-items-baseline">
                    <div class="col-md-5 text-center">
                        <img src={logo} alt="" width="150px" />
                        <div className="d-flex justify-content-center mt-4">
                            <div className="ml-3 mr-3">
                                <img src={facebook} alt="" width="25px" />
                            </div>
                            <div className="mr-3">
                                <img src={twitter} alt="" width="25px" />
                            </div>
                            <div className="mr-3">
                                <img src={linkedin} alt="" width="25px"  />
                            </div>
                            <div className="mr-3">
                                <img src={dribble} alt="" width="25px"  />
                            </div>
                            <div className="mr-3">
                                <img src={dribble} alt="" width="25px"  />
                            </div>

                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 p-5">
                        <p>Feature</p>
                        <p>Enterprise</p>
                        <p>Pricing</p>
                    </div>
                    <div class="col-md-2 p-5">
                        <p>Blog</p>
                        <p>Help Center</p>
                        <p>Contact Us</p>
                        <p>Status</p>
                    </div>
                    <div class="col-md-2 p-5">
                        <p>About Us</p>
                        <p>Terms of Service</p>
                        <p>Security</p>
                        <p>Login</p>
                    </div>
                </div>
            </div>

            <div className="text-center text-default">
                <p style={{ fontWeight: 'bold' }}>© Copyright <a href="https://github.com/touhedulhaque">Md Touhedul Haque</a>, <a href="https://github.com/zabir1998">Zabir Siddique</a> and <a href="https://github.com/jh-jitu">Md Jidanul Hakim Jitu</a>   {(new Date()).getFullYear()} All Rights Reserved. (Team 54.5 oriented by <a href="https://www.programming-hero.com/">Programming Hero</a>) . </p>
            </div>


        </section>
    );
};

export default Footer;