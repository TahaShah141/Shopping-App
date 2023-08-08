import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import Shop from "./Shop.jsx";
import Cart from "./Cart.jsx";


export default function Router() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {index: true, element: <Shop />},
                {path: 'shop', element: <Shop />},
                {path: 'cart', element: <Cart />},
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}