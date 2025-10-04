import { Button, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { MdAddCircle } from 'react-icons/md';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { getCart, RemoveCartItem, updateCartItem } from '../../../State/Cart/Action';
import { useNavigate } from 'react-router-dom';

function Cartitem({item}) {
   
    const dispatch=useDispatch();
    const handleRemoveItem=(id)=>{
        console.log("remove item id ",id);
        dispatch(RemoveCartItem(id));
       
    }

    const navigate = useNavigate();
 const handleUpdateCartItem = (num) => {
  const newQuantity = item.quantity + num;

  if (newQuantity < 1) return; // prevent invalid

  dispatch(
    updateCartItem({
      cartItemId: item.id,
      cartItem: { quantity: newQuantity }, // ✅ direct body
    })
  );
};


    
    return (
        <div className='shadow-lg p-5 border rounded-md cursor-pointer' >
            <div className='flex  items-center' onClick={()=>navigate(`/product/${item?.product?.id}`)}>
                <div className='w-[5rem] h-[5rem] lg:w-[10rem] lg:h-[10rem]'>
                    <img className='w-full h-full object-cover'
                        src={item?.product?.imageUrl}></img>
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item?.product?.title}</p>
                    <p className="opacity-70">Size: {item?.size}</p>
                    <p className="opacity-70">  Color:  {item?.product?.color}</p>
                    <p className="opacity-70">{item?.product?.brand}</p>

                    <div className="flex items-center space-x-5 text-gray-900 pt-6">
                        <p className="font-semibold">{item?.discountedPrice}</p>
                        <p className="opacity-50 line-through ">{item?.price}</p>
                        <p className="text-green-600 font-semibold">{item?.product?.discountedPresent}% off</p>
                    </div>
                </div>
                
            </div>
            <div className='lg:flex items-center lg:space-x-10 pt-4'>
                    <div className='flex items-center space-x-5'>
                       <div className="flex items-center space-x-2">
      <button
        onClick={() => handleUpdateCartItem(-1)}
        disabled={item?.quantity < 2}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        -
      </button>

      <span className="py-1 px-6 border rounded-sm">
        Quantity: {item?.quantity}
      </span>

      <button
        onClick={() => handleUpdateCartItem(1)}
        disabled={item?.quantity >= item?.product?.quantity}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        +
      </button>
    </div>
                       
                        <div>
                           <Button 
  sx={{ color: 'RGB(145 85 253)' }} 
  onClick={() => handleRemoveItem(item.id)}
>
  Remove
</Button>

                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Cartitem;