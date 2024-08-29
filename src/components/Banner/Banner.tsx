import banner1 from '/images/banner1.jpg'
const Banner = () => {
    // const imageUrl = "https://png.pngtree.com/thumb_back/fw800/background/20240428/pngtree-a-car-being-washed-from-automatic-car-wash-view-from-inside-image_15670759.jpg";
    
    return (
        <div className="relative w-full h-screen flex items-center ">
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
      
        <div className='ml-[136px] relative z-10'>

    
                <div className="text-white">
                <div >
                    
                    <h2 className="text-2xl md:text-[52px] text-white font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
                        Unleash the <br className="hidden md:block" /> Shine Your Ride <br className="hidden md:block" /> Deserves
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <button className="bg-[#0068d8] hover:bg-[#1a77dc] py-1 px-5 md:py-1 md:px-7 text-white text-sm md:text-base uppercase">
                       our services
                    </button>
                    <div>
                        <p className='text-white '>
                            We offer top-notch car washing and detailing <br className="hidden md:block" /> services that will make your car shine
                        </p>
                    </div>
                </div>
                </div>
               
                </div>
        </div>
    );
};

export default Banner;
