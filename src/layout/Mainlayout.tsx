import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import HeaderSection from '../components/Header/Header';


const MainLayout = () => {
    return (
        <div className="mx-auto max-w-full  relative">
         <HeaderSection/>
            <main className=''>
                <Outlet />
            </main>

            {/* Footer */}
            <Footer/>

           
        </div>
    );
};

export default MainLayout;