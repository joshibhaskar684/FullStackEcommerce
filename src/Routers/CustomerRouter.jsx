import { Route, Routes } from 'react-router-dom';
import Navigation from './../customer/components/navigation/Navigation';
import Homepage from './../customer/components/pages/HomePage/Homepage';
import Product from './../customer/components/Product/Product';
import Productdetails from './../customer/components/Productdetails/Productdetails';
import Cart from './../customer/components/Cart/Cart';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';
import Footer from './../customer/components/Footer/Footer';
import Checkout from '../customer/components/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSucess from '../customer/components/Payment/PaymentSucess';



function CustomerRouter() {
    return (
        <>
            <><Navigation /></>

<ToastContainer position="top-right" autoClose={3000} hideProgressBar />


            <Routes>
                {/* <Route path="/login" element={<AuthModal open={true} handleClose={() => navigate("/")}   // same for register
                />} />
                <Route path="/register" element={<AuthModal open={true} handleClose={() => navigate("/")}   // same for register
                />} /> */}

                <Route path="/login" element={<Homepage />} />
               
                <Route path="/register" element={<Homepage />} />
               
                <Route path="/" element={<Homepage />} />
                <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product/>} />
                <Route path="/product/:productId" element={<Productdetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<Checkout />} />
                <Route path="/cart/checkout/payments" element={<Checkout/>} />
                <Route path="/account/order" element={<Order />} />
           
                <Route path="/account/order/:orderId" element={<OrderDetails />} />
           
                           <Route path="/payments/:orderId" element={<PaymentSucess />} />
            
            </Routes>

            <> <Footer /></>
        </>
    );
}

export default CustomerRouter

