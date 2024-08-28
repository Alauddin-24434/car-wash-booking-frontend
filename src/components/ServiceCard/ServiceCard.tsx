

const services = [
    {
        id: 1,
        title: "Car Wash",
        description: "Professional car washing service",
        imageUrl: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
        id: 2,
        title: "Interior Detailing",
        description: "Deep cleaning for your car's interior",
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
        id: 3,
        title: "Paint Protection",
        description: "Protect your car's paint with our advanced solutions",
        imageUrl: "https://images.unsplash.com/photo-1614072257374-751a30d9a1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
        id: 4,
        title: "Engine Cleaning",
        description: "Thorough cleaning for your car's engine",
        imageUrl: "https://images.unsplash.com/photo-1592495419600-0b07e3d8b204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
        id: 5,
        title: "Headlight Restoration",
        description: "Restore clarity to your headlights",
        imageUrl: "https://images.unsplash.com/photo-1565476011-79818e8ae29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
        id: 6,
        title: "Odor Removal",
        description: "Eliminate unpleasant odors from your car",
        imageUrl: "https://images.unsplash.com/photo-1598302081612-b254a7528dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxwcm9kdWN0fGVufDB8MHx8fDE3MTIwNjI5MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
   
];

const ServiceCard = () => {
    return (
        <div className="flex flex-col w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 ">
                {services.map(service => (
                    <div key={service.id} className="bg-white border  shadow-lg flex flex-col justify-between gap-y-4 p-4">
                        <img
                            className="w-full h-48 object-cover "
                            src={service.imageUrl}
                            alt={service.title}
                        />
                        <div className="flex flex-col gap-y-2 mt-4">
                            <h4 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                                {service.title}
                            </h4>
                            <p className="text-xs sm:text-xs md:text-base text-gray-600 dark:text-gray-300">
                                {service.description}
                            </p>
                            <button className="bg-[#0068d8] text-white text-sm md:text-base py-2 px-4  hover:bg-[#0056b3] transition-colors duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;
