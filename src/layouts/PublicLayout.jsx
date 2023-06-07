
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => {
    return (
        <div>
         <Navbar></Navbar>   
         <Outlet></Outlet>
        </div>
    );
};

export default PublicLayout;