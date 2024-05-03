/* eslint-disable no-unused-vars */

import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import Home from "./Pages/Home";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import LayOut from "./features/Navbar/LayOut";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "signin",
        element: <SignUpPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "product-details/:product_id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    // <div>
    //   <SignUpPage>

    //   </SignUpPage>
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
