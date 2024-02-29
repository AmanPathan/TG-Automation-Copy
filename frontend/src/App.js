import React from "react";
import ReactDom from "react-dom/client";
import Form from './components/Form';
import LoginSignup from './LoginSignup';
import Empty from './empty';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import 

const AppLayout = () => {
    return (
        <div>
            <Empty/>
            <Outlet/>
        </div>
    )
};

const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <LoginSignup/>,
                errorElement: <Error/>,
            },
            {
                path: "/infoForm",
                element: <Form/>,
                errorElement: <Error/>
            },
        ],
        errorElement: <Error/>
    },
])

const root = ReactDom.createRoot(document.getElementById("main"));

root.render(<RouterProvider router={appRouter} />)