
import { Button } from '@mui/material'
import Cartitem from './Cartitem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';
import { useEffect } from 'react';

export default function Cart() {
    const navigate = useNavigate();
    const handlecheckout = () => {
        navigate("/cart/checkout?step=1");

    }
    const{cart}=useSelector(Store=>Store);
    const dispatch=useDispatch ();
    
useEffect(()=>{
    dispatch(getCart());
   
},[cart.cartItems?.length]);
  
    
  return (
   
    <>
    <div className='lg:grid grid-cols-3  lg:px-16 relative mb-0'>
<div className='col-span-2 mb-10 space-y-5'>
{cart.cartItems?.length===0 && <div className='text-2xl font-semibold flex flex-col justify-center items-center'>
  <img src="https://img.freepik.com/free-vector/empty-shopping-cart-concept-illustration_114360-552.jpg" className="w-[360px] h-[460px]"></img>
  <p className='tex-2xl font-semibold text-gray-600'>Your cart is empty</p>
  </div>}

{cart?.cartItems?.map((item,index) => <Cartitem key={index} item={item}  />)}
</div>
    

<div className=' border-5 border-gray-200 px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
        <div className='border p-10'>

<p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
  <hr/>
  <div className='space-y-3 mb-10 font-semibold'>
    <div className='flex justify-between pt-3 text-black '>
        <span> Price</span>
        <span className='line-through'>₹{cart?.cart?.totalPrice}</span>
    </div>
    <div className='flex justify-between pt-3 text-black'>
        <span> Discount</span>
        <span className='text-green-600'>-₹{cart?.cart?.discount}</span>
    </div>
    <div className='flex justify-between pt-3 text-black'>
        <span> Delivery Charge</span>
        <span className='text-green-600'>Free</span>
    </div>
    <hr/>
    <div className='flex justify-between pt-3 text-black font-bold'>
        <span> Total Amount</span>
        <span className='text-green-600'>₹{cart?.cart?.totaldiscountedPrice}</span>
    </div>
  </div>
  <Button onClick={handlecheckout} variant='contained' className='w-full mt-5' sx={{px:"2.5rem",py:".7rem",bgcolor:"#9155fd"}}           >
                    Proceed to Buy
                </Button>

        </div>
            </div>
       </div>
    </>
    
    
  )
}
