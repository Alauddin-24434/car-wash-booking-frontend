import { FormEvent, ChangeEvent, useState } from 'react';
import './Login.css';
import banner2 from '/images/banner2.jpg'
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { verifyToken } from '../../utils/VerifyToken';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUser, useCurrentToken } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
interface FormData {

    email: string;
    password: string;

}
interface ERrorData {
    success: boolean;
    message: string;
    data: null;
  }
  
  interface ERror {
    status: number;
    data: ERrorData;
  }
const Login = () => {

    const token = useAppSelector(useCurrentToken);

    let user;
    if (token) {
      user = verifyToken(token);
     
    }
  
  
    const userRole = {
      ADMIN: 'admin',
      USER: 'user',
    };

    const [login,{data,isError,error,isLoading}]=useLoginMutation()
    const dispatch= useAppDispatch()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
      
    });

    console.log(data)
    // Change event type for input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
const navigate= useNavigate()
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add default role here
    const userData = { ...formData, role: 'user' };
    
    try {
        const response = await login(userData).unwrap();
        const user = verifyToken(response.data.accessToken);

        // Dispatch the user data and token to Redux
        dispatch(setUser({ user: user, token: response.data.accessToken }));

        // Role-based navigation using switch statement
        switch (user.role) {
            case userRole.ADMIN:
                navigate('/dashboard/admin-dashboard');
                break;
            case userRole.USER:
                navigate('/dashboard/user-dashboard'); // Adjust this route as needed
                break;
            default:
                navigate('/'); // Default route if the role is unknown
                break;
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
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
                    <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Professional Car Wash
                    and Detailing Center</div>
                    <div className="sm:text-sm xl:text-md text-gray-200 font-normal">We are a dedicated team of professionals providing top-quality car wash and detailing services. Our mission is to make your vehicle shine like new, with attention to detail and customer satisfaction at the forefront.</div>
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
                        <p className="mt-2 text-sm text-gray-500">Please Login to your account</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                          
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
                            </div>
                           
                         
                        </div>
                        <div>
                        <button
                      type="submit"
                      className="w-full py-4 text-xl font-medium text-center text-white bg-green-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                        </div>
                    </form>
                
                         {isError && (
                            <p className="text-red-500 mt-4 text-center">
                              {(error as ERror)?.data?.message || 'An error occurred'}
                            </p>
                          )}
                  
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;