import { FaPhoneAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa"; // Example icon
import { BsCheck2Circle } from "react-icons/bs";
const WhoWeareSection = () => {
  const features = [
    "Over 150,000 Cars Cleaned",
    "State-of-the-Art Equipment",
    "Eco-Friendly Products",
    "Experienced Technicians",
    "Affordable Pricing",
    "Convenient Location",
  ];
  return (
    <div className="p-4 py-12">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[40%] relative overflow-hidden mb-4 md:mb-0">
          <img
            src="https://lirp.cdn-website.com/f8cd5085/dms3rep/multi/opt/2024-Hyundai-Palisade-Black-PPF-Ceramic-Coating-Photos-5-scaled-bbd40c29-1920w.jpg"
            alt="Car Detailing"
            className="w-full md:w-5/6 h-[300px] md:h-[510px] object-cover"
          />

          <div className="absolute border bg-white w-[100px] h-[80px] md:w-[140px] md:h-[125px] top-2 left-2 md:top-4 md:left-4">
            <div className="flex flex-col justify-center items-center h-full">
              <span>
                <FaAward className="text-xl md:text-4xl text-[#0068d8]" />{" "}
                {/* Replace with your preferred icon */}
              </span>
              <h3 className="text-lg font-bold">22 +</h3>
              <p className="text-xs md:text-sm">Years Of Experience</p>
            </div>
          </div>

          <div className="absolute border bg-white w-[120px] h-[90px] md:w-[160px] md:h-[150px] bottom-6 left-24 md:bottom-12 md:left-72 p-2">
            <img
              src="https://www.wordpress.codeinsolution.com/gleamcar/wp-content/uploads/sites/57/2024/07/backlight-of-black-sport-car.jpg"
              alt="Car Backlight"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-[60%]  p-4 ">
          <div className="flex flex-col ">
            <h2 className="text-sm  md:text-base text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
              Who we are?
            </h2>
            <h2 className="text-2xl md:text-[52px] text-[#0e111b] font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
              Professional Car Wash <br className="hidden md:block" /> and
              Detailing Center
            </h2>

            <p className="text-xs md:text-xs lg:text-sm mt-4 text-[#424649]">
              We are a dedicated team of professionals providing top-quality car
              wash and detailing services. Our mission is to make your vehicle
              shine like new, with attention to detail and customer satisfaction
              at the forefront.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-[#424649]">
              {features?.map((item, index) => (
                <li key={index} className="flex flex-row items-center gap-2">
                  <BsCheck2Circle className="text-[#0068d8] text-lg" />
                  <p className="text-sm">{item}</p>
                </li>
              ))}
            </ul>

            <hr className="my-4 border-t border-[#424649]" />

            <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-[#0068d8] hover:bg-[#1a77dc] py-1 px-5 md:py-1 md:px-7 text-white text-sm md:text-base hover:text-xs uppercase hover:w-44 hover:h-12 ">
                More About Us
              </button>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <FaPhoneAlt />
                <div>
                  <p>Call Us Anytime!</p>
                  <p>+0 (555) 123 45 67</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeareSection;