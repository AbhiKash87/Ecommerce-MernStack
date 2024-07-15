/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/Cart/cartSlice";
import { reserCurrentOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
  const { orderId } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paymentIntent = queryParams.get('payment_intent');
  const paymentIntentClientSecret = queryParams.get('payment_intent_client_secret');
  const redirectStatus = queryParams.get('redirect_status');

  // console.log(paymentIntent, paymentIntentClientSecret, redirectStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    
    if (redirectStatus === 'succeeded') {
      dispatch(resetCartAsync());
      dispatch(reserCurrentOrder());
    }
  }, [dispatch, redirectStatus]);

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <main className="min-h-full bg-white px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center">
      <div className="text-center">
        {redirectStatus === 'succeeded' ? (
          <>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Successfully Placed
            </h1>
            <p className="text-base font-semibold text-indigo-600">
              Your order Number #{orderId}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can check your order in My Account
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">
              Order Failed
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Unfortunately, your order could not be processed at this time.
            </p>
          </>
        )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          {redirectStatus !== 'succeeded' && (
            <Link
              to="/checkout"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Try Again
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default OrderSuccessPage;
