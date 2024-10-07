
import { IoMdTime } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


  
const ServiceCard = ({ service }:any) => {

const navigate=useNavigate()
  const handleNavigate =()=>{
navigate(`/serviceDetails/${service._id}`)
  }
  return (
    <article onClick={handleNavigate}  className="rounded-xl hover:cursor-pointer bg-white p-3 shadow-md hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div  className="relative flex items-end overflow-hidden rounded-xl">
        <img src={service?.image} alt={service?.name} className="w-full h-48 object-cover"/>
       
      </div>

      <div className="mt-1 p-2">
        <h2 className="text-slate-700 font-bold">{service?.name}</h2>
        <p className="mt-1 text-sm text-slate-400">{service?.description}</p>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold text-blue-500">${service?.price}</p>
          <div className="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-blue-600 duration-100">
            <span className="text-sm flex gap-1 items-center">
              <IoMdTime />
              {service?.duration}m
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
