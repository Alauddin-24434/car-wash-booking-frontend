import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MainLayout from "../layout/Mainlayout";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";


export const router= createBrowserRouter([
{
    path:'/',
    element:<MainLayout/>,
    children:[
        {
            path:'/',
            element:<App/>
        }
        ,
{
    path:'/signup',
    element:<Signup/>
}
,
{
    path:'/login',
    element:<Login/>
}
    ]
}

])