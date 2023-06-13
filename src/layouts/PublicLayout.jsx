
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const PublicLayout = () => {
    const [theme, setTheme] = useState();
    return (
        <div data-theme={theme ? 'cupcake' : 'dark'}>
         <Navbar theme={theme} setTheme={setTheme}></Navbar>   
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default PublicLayout;