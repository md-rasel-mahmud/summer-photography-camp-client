
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <div>
         <Navbar></Navbar>   
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default PublicLayout;