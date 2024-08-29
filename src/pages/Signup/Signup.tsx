import { FormEvent, ChangeEvent, useState } from 'react';
import './Signup.css';
import banner2 from '/images/banner2.jpg';
import { useSignUpMutation } from '../../redux/features/auth/authApi';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

// Define the type for form data
interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}
interface SignupError {
    data: {
        status: string;
        message: string;
        errors?: {
            [key: string]: string; // For handling field-specific errors
        };
    };
    status: number;
}

const Signup = () => {
    const [signup, { isError, error, isLoading }] = useSignUpMutation();
  

    // Initialize form data with the provided values
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = { ...formData, role: 'user' };
       
        signup(userData)
           
    };

    return (
        <div className="relative min-h-screen flex">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <div className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                    style={{
                        backgroundImage: `url(${banner2})`,
                    }}>
                    <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
                    <div className="absolute triangle min-h-screen right-0 w-16"></div>
                    <div className="w-full max-w-md z-10">
                        <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                            Professional Car Wash and Detailing Center
                        </div>
                        <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                            We are a dedicated team of professionals providing top-quality car wash and detailing services. Our mission is to make your vehicle shine like new, with attention to detail and customer satisfaction at the forefront.
                        </div>
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
                </div>
                <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcome Back!
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">Please sign up to create your account</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="sr-only">Address</label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    className="w-full py-4 text-xl font-medium text-center text-white rounded-lg transition duration-200 bg-green-600 hover:bg-green-700 ease"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing Up...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                     
                        {isError && error && (
                            <p className="text-red-500 mt-4 text-center">
                                {(error as SignupError).data.message || "An unexpected error occurred. Please try again."}
                            </p>
                        )}

                            <div className="text-center mt-4">
                                <p className="text-black">If already have an account <Link to="/login" className="text-blue-600 hover:underline">login here</Link>.</p>
                            </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
