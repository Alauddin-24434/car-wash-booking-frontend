import { FormEvent, ChangeEvent, MouseEvent, useState } from 'react';

// Define the type for form data
interface FormData {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
}

const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    });

    // Change event type for input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form submission event type
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add default role here
        const userData = { ...formData, role: 'user' };

        // Perform form submission logic here, such as sending `userData` to your backend
        console.log('Form submitted:', userData);
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          
                   
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="w-64">
                            <div>
                                <h1 className="text-2xl font-semibold">Sign Up</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Name"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Email address"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Password"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Phone Number"
                                        />
                                        <label
                                            htmlFor="phoneNumber"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Phone Number
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                            placeholder="Address"
                                        />
                                        <label
                                            htmlFor="address"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <button type="submit" className="bg-cyan-500 text-white rounded-md px-4 py-2">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="w-full flex justify-center mt-6">
                            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <svg
                                    className="h-6 w-6 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="800px"
                                    height="800px"
                                    viewBox="-0.5 0 48 48"
                                    version="1.1"
                                >
                                    <title>Google-color</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-1"
                                                    fill="#FBBC05"
                                                ></path>
                                                <path
                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C13.828,14.8906667 18.7712727,11.9408 23.7136364,10.1333333"
                                                    id="Fill-2"
                                                    fill="#FF6D01"
                                                ></path>
                                                <path
                                                    d="M10.5322727,19.6437333 C13.828,14.8906667 18.7712727,11.9408 23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333"
                                                    id="Fill-3"
                                                    fill="#FF3D00"
                                                ></path>
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-4"
                                                    fill="#4CAF50"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Signup;
