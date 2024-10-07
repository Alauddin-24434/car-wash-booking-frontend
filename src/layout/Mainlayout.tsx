import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import HeaderSection from '../components/Header/Header';
import ScrollToTop from '../components/Shared/ScrollToTop/ScrollToTop';



const MainLayout = () => {
    return (
        <div className="mx-auto max-w-full  relative">
        
         <HeaderSection/>
   
            <main className=''>
                <Outlet />
            </main>

            {/* Footer */}
            <ScrollToTop />
            <Footer/>

           
        </div>
    );
};

export default MainLayout;