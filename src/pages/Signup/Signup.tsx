import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSignUpMutation } from '../../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import banner2 from '/images/banner2.jpg';
import useFirebaseUpload from '../../utils/hooks/useFirebaseUpload';
import './Signup.css';
import Loader from '../../components/Shared/Loader/Loader';


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
    errors?: { [key: string]: string };
  };
  status: number;
}

const Signup: React.FC = () => {
  const [signup, {  isLoading }] = useSignUpMutation();
  const {  uploadImage } = useFirebaseUpload();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // New state for loading during image upload

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading || isUploading) return; // Prevent submission during upload or signup

    try {
      let userImageUrl = '';

      if (selectedFile) {
        setIsUploading(true); // Start showing loading indicator
        userImageUrl = await uploadImage(selectedFile);
        setIsUploading(false); // Stop loading once the image is uploaded
      }

      const response = await signup({
        ...formData,
        image: userImageUrl || null,
        role: "user",
      }).unwrap();

      if (response.success) {
        toast.success('Signup successful!');
        navigate('/login');
      }
    } catch (err) {
      const signupError = err as SignupError;
      setIsUploading(false); // Stop loading if there's an error
      toast.error(signupError?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="relative min-h-screen flex">
      {isUploading || isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <Loader />
        </div>
      ) : null}
      <div className="relative flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-green-900 text-white bg-no-repeat bg-cover relative"
          style={{ backgroundImage: `url(${banner2})` }}
        >
          <div className="absolute bg-gradient-to-b from-green-900 to-gray-900 opacity-75 inset-0 z-0"></div>
          <div className="absolute triangle min-h-screen right-0 w-16"></div>
          <div className="w-full max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Join Us Today!</div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              Sign up now and become a part of our car wash and detailing community. Enjoy top-notch services and exclusive offers!
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
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none  relative">
  <div className="max-w-md w-full space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Create an Account</h2>
      <p className="text-sm text-gray-500">Please fill out the form below to sign up</p>
    </div>
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userImage" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isLoading || isUploading ? 'Processing...' : 'Sign Up'}
        </button>
      </div>
      <p className="text-sm text-gray-600">
        Already have an account? <Link to="/login" className="font-medium text-green-600 hover:text-green-700">Sign in</Link>
      </p>
    </form>
  </div>
</div>

      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
