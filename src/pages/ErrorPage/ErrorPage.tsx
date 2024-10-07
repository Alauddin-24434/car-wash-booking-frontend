// src/pages/ErrorPage/ErrorPage.tsx

import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">Oops! The page you are looking for doesn't exist.</p>
      <NavLink
        to="/"
        className="px-6 py-3 font-semibold rounded bg-[#0068d8] hover:bg-[#1a77dc]  md:px-8 text-white text-sm md:text-base"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
