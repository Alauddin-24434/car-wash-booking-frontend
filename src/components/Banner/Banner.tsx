import { useNavigate } from 'react-router-dom';
import banner1 from '/images/banner1.jpg'
const Banner = () => {
    // const imageUrl = "https://png.pngtree.com/thumb_back/fw800/background/20240428/pngtree-a-car-being-washed-from-automatic-car-wash-view-from-inside-image_15670759.jpg";
    const navigate= useNavigate();
    const handleNavigate=()=>{
        navigate('/services')
    }
    return (
        <div className="relative md:h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${banner1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay with opacity */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            </div>
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            {/* Content */}
      {/* left vertical center */}
        <div className=' max-w-7xl mx-auto text-white h-full flex flex-col justify-center  px-4 relative z-10'>

    
               
        <div className=" text-white px-4 text-center md:text-left">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="hidden md:block lg:block text-sm md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight mt-2">
                            Unleash the Shine Your Ride <br className="hidden md:block" /> Deserves
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <button onClick={handleNavigate} className="bg-[#0068d8] hover:bg-[#1a77dc] py-2 px-6 w-40 md:w-auto lg:w-auto text-white text-sm md:text-base uppercase">
                                Our Services
                            </button>
                            <div>
                                <p className="text-white">
                                    We offer top-notch car washing and detailing <br className="hidden md:block" /> services that will make your car shine
                                </p>
                            </div>
                        </div>
                    </div>
              
                    </div>
              
                    </div>
              
               
               
        </div>
    );
};

export default Banner;