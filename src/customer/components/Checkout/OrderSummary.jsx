import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Cartitem from '../Cart/Cartitem';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById } from '../../../State/Product/Action';
import { getOrderById } from '../../../State/Order/Action';
import { createPayment } from '../../../State/Payment/Action';

function OrderSummary() {
    const navigate = useNavigate();

    const dispatch=useDispatch();
    const location=useLocation();
     const {order}=useSelector(Store=>Store);

    const searchParams=new URLSearchParams(location.search);    
    const orderId=searchParams.get("order_id");
    useEffect(()=>{
        dispatch(getOrderById(orderId));
            },[orderId]);

               const handleCheckout = () => {
        dispatch(createPayment(orderId));
           }

  return (
    <div className='m-5 space-y-10'>
        <div className=' p-5  shadow-lg  rounded-s-md border '>
<AddressCard address={order.order?.shippingAddress}/>
        </div>
       <>
    <div className='lg:grid grid-cols-3  lg:px-16 relative mb-0'>
<div className='col-span-2 mb-10 space-y-5'>
{order.order?.orderItems?.map((item,index) => <Cartitem key={index} item={item} />)}
</div>
    

<div className=' border-5 border-gray-200 px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
        <div className='border p-10'>

<p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
  <hr/>
  <div className='space-y-3 mb-10 font-semibold'>
    <div className='flex justify-between pt-3 text-black'>
        <span> Price</span>
        <span className=''>${order.order?.totalPrice}</span>
    </div>
    <div className='flex justify-between pt-3 text-black'>
        <span> Discount</span>
        <span className='text-green-600'>-${order?.order?.discount}</span>
    </div>
    <div className='flex justify-between pt-3 text-black'>
        <span> Delivery Charge</span>
        <span className='text-green-600'>Free</span>
    </div>
    <hr/>
    <div className='flex justify-between pt-3 text-black font-bold'>
        <span> Total Amount</span>
        <span className='text-green-600'>{order?.order?.totalDiscountedPrice}</span>
    </div>
  </div>
  <Button variant='contained' className='w-full mt-5' sx={{px:"2.5rem",py:".7rem",bgcolor:"#9155fd"}} onClick={()=>handleCheckout()}          >
                    Proceed to Buy
                </Button>

        </div>
            </div>
       </div>
    </>
    </div>
  )
}

export default OrderSummary