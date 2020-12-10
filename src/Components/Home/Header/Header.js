import React from 'react';
import MainSec from './MainSec/MainSec';
import Navbar from './Navbar/Navbar';

const Header = () => {
    return (
        <section>
        <div className="headerSec">
            <Navbar></Navbar>
            <MainSec></MainSec>
        </div>
        </section>
    );
};

export default Header;