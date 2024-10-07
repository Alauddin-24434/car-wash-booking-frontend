

const ContactUs = () => {
  return (

    <div className="py-12">
         <div className="text-center">
            <h2 className="text-sm md:text-base text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
             Contact Us
            </h2>
            <h2 className="text-2xl md:text-[52px] text-[#0e111b] font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
             How people find our location 
              <br className="hidden md:block" />& contact Info
            </h2>
          </div>
          <div className="p-4">

<div
  id="map"
  className="relative h-[200px] md:h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3651.138676888691!2d90.37225553229166!3d23.778075599440303!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b3340c1c91%3A0xfec009b60808d80a!2sICT%20Tower!5e0!3m2!1sen!2sbd!4v1723991555221!5m2!1sen!2sbd"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
<div className="container  md:px-12">
  <div className="block rounded-lg bg-white bg-opacity-80 px-6 py-12 shadow-lg md:py-16 md:px-12 -mt-[50px] md:-mt-[100px] backdrop-blur-md border border-gray-300">
    <div className="flex flex-wrap">
      <div className="mb-12 w-full md:w-full lg:w-5/12 lg:px-6">
        <form>
          <div className="relative mb-6">
            <input
              type="text"
              className="peer block w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 focus:placeholder:opacity-100 peer-focus:text-primary"
              id="exampleInput90"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-0 mb-0 max-w-[90%] pt-[0.37rem] text-neutral-500 transition-all peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary"
              htmlFor="exampleInput90"
            >
              Name
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="email"
              className="peer block w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 focus:placeholder:opacity-100 peer-focus:text-primary"
              id="exampleInput91"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-0 mb-0 max-w-[90%] pt-[0.37rem] text-neutral-500 transition-all peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary"
              htmlFor="exampleInput91"
            >
              Email address
            </label>
          </div>
          <div className="relative mb-6">
            <textarea
              className="peer block w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 focus:placeholder:opacity-100 peer-focus:text-primary"
              id="exampleFormControlTextarea1"
              placeholder=" "
            ></textarea>
            <label
              className="absolute left-3 top-0 mb-0 max-w-[90%] pt-[0.37rem] text-neutral-500 transition-all peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary"
              htmlFor="exampleFormControlTextarea1"
            >
              Message
            </label>
          </div>
          <div className="mb-6">
            <input
              type="checkbox"
              className="mr-2"
              id="exampleCheck96"
            />
            <label htmlFor="exampleCheck96">
              Send me a copy of this message
            </label>
          </div>
          <button
            type="button"
            className="mb-6 w-full rounded bg-[#0068d8] text-white px-6 py-2.5 text-xs font-medium uppercase"
          >
            Send
          </button>
        </form>
      </div>
      <div className="w-full lg:w-7/12 lg:px-6">
        <div className="flex flex-wrap">
          <div className="mb-12 w-full md:w-6/12 xl:w-6/12">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="inline-block rounded-full bg-[#0068d8] p-3 text-white shadow-md">
                  <i className="fas fa-map-marker-alt fa-2x "></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold mb-1">Address</p>
                <p>2215 John Daniel Drive, Clark, MO 65243</p>
              </div>
            </div>
          </div>
          <div className="mb-12 w-full md:w-6/12 xl:w-6/12">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="inline-block rounded-full bg-[#0068d8] p-3 text-white shadow-md">
                  <i className="fas fa-phone fa-2x"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold mb-1">Phone</p>
                <p>(+00) 123 456 789</p>
              </div>
            </div>
          </div>
          <div className="mb-12 w-full md:w-6/12 xl:w-6/12">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="inline-block rounded-full bg-[#0068d8] p-3 text-white shadow-md">
                  <i className="fas fa-envelope fa-2x"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold mb-1">Email</p>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="inline-block rounded-full bg-[#0068d8] p-3 text-white shadow-md">
                  <i className="fas fa-clock fa-2x"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold mb-1">Opening Hours</p>
                <p>Mon - Fri: 8am - 6pm</p>
                <p>Sat: 10am - 4pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
  );
};

export default ContactUs;