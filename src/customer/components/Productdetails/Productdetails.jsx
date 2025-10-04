
import { Box, Grid, LinearProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import ProductReviewCard from './ProductReviewCard';
import { Homesectioncaroseldata } from './../../../Data/Homesectioncarsouledata';
import Homesectioncard from '../HomesectionCards/Homesectioncard';
import SimilarProductcard from './SimilarProductcard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findProductById } from '../../../State/Product/Action';
import { useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import { addItemtocart } from '../../../State/Cart/Action';

import { toast } from "react-toastify";
import AuthModal from '../../Auth/AuthModal';

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  

export default function Productdetails() {
   const [openAuthModal, setOpenAuthModal] = useState(false);
   
   const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const handleSizeChange = (e) => {
    const size = productStore.product.sizes.find(
      (s) => s.name === e.target.value
    );
    setSelectedSize(size);
    setSelectedQuantity(""); // reset quantity when size changes
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };
  const navigate=useNavigate();

const {productStore,auth}=useSelector(Store=>Store);
    const params=useParams();
const dispatch=useDispatch();
useEffect(() => {
  
  dispatch(findProductById({productId:params.productId}));

}, [params.productId]);



const handleAddToCart = () => {
  if (!selectedSize) {
    toast.error("Please select a size before adding to cart.");
    return;
  }

  if (!selectedQuantity) {
    toast.error("Please select a quantity before adding to cart.");
    return;
  }

  const data = {
    productId: params.productId,
    size: selectedSize.name,
    quantity: selectedQuantity,
    price: productStore.product.discountedPrice,
  };

  console.log(data);
  dispatch(addItemtocart(data));
 
};


  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))} */}
            <li className="text-sm">
              {/* <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a> */}
            </li>
          </ol>
        </nav>


        <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10 '>
          {/*  big Image gallery */}
          <div className='flex flex-col items-center'>
            <div className="  ovrerflow-hidden  rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={productStore?.product?.title}
                // src={product.images[0].src}
                src={productStore?.product?.imageUrl}
                className=" w-full h-full object-cover object-center "
              />

            </div>
            {/* <div className='flex flex-wrap space-x-5 justify-center'>
              {
                product.images.map((image, index) => (

                  <div className='aspect-w-3 aspect-h-2 max-w-[5rem] max-h-[5rem] mt-4  ovrerflow-hidden rounded-lg'>
                    <img
                      alt={image.alt}
                      src={image.src}
                      className=" w-full h-full object-cover object-center mb-4"
                    />

                  </div>
                ))
              }
            </div> */}

<div className='flex flex-wrap space-x-5 justify-center'>
              {
                

                  <div className='aspect-w-3 aspect-h-2 max-w-[5rem] max-h-[5rem] mt-4  ovrerflow-hidden rounded-lg'>
                    <img
                      alt={productStore.product?.title}
                      src={productStore.product?.imageUrl}
                      className=" w-full h-full object-cover object-center mb-4"
                    />

                  </div>
                
              }
            </div> 
          </div>

          {/* productStore info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">{productStore.product?.brand}</h1>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900 opacity-60 pt-1">{productStore.product?.title}</h1>

            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className='flex items-center space-x-5 text-lg lg:text-xl mt-6 text-gray-900'>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{productStore.product?.discountedPrice}</p>
                  <p className="opacity-50 line-through ">{productStore.product?.price}</p>
                  <p className="text-green-600 font-semibold">{productStore.product?.discountedPresent+"%"}</p>
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className='flex items-center space-x-3'>
                  <Rating name="read-only" value={4} readOnly />
                  <p className="opacity-50 text-sm">100k+ Ratings</p>
                  <p className="opacity-50 text-sm font-medium text-indigo-600 ml-3 hover:text-indigo-500">100k+ Reviews</p>
                </div>
              </div>

              <form className="mt-10">


                {/* Sizes  */}
                  <fieldset aria-label="Choose a size" className="mt-4">
      <div className="grid grid-cols-4 gap-3">
        {productStore.product?.sizes?.map((size, index) => {
          const isOutOfStock = size.quantity === 0;

          return (
            <div
              className="flex flex-col mt-5 mb-5 space-y-5"
              key={index}
            >
              <label
                className={`group relative flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase
                  ${
                    isOutOfStock
                      ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-900 hover:border-indigo-600 hover:bg-indigo-50"
                  }
                  peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white transition duration-200`}
              >
                <input
                  type="radio"
                  name="size"
                  value={size.name}
                  disabled={isOutOfStock}
                  onChange={handleSizeChange}
                  className="sr-only peer"
                />
                {size.name}
              </label>
              <p>Stock: {size.quantity}</p>
            </div>
          );
        })}
      </div>

      {/* Quantity Select */}
      <div className="w-[100%] mt-4">
        <label className="block mb-2 text-gray-700 font-medium">Quantity</label>
        <select
          name="SelectQuantity"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="w-[100%] px-4 py-2 border border-gray-300 rounded-md"
          disabled={!selectedSize} // disable until size selected
          required
        >
          <option value="">Select Quantity</option>
          {selectedSize &&
            [...Array(selectedSize.quantity).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
        </select>
      </div>

      {/* Show selection */}
      {selectedSize && (
        <p className="mt-4 text-sm text-gray-600">
          Selected Size: <span className="font-medium">{selectedSize.name}</span>
        </p>
      )}
      {selectedQuantity && (
        <p className="mt-2 text-sm text-gray-600">
          Selected Quantity:{" "}
          <span className="font-medium">{selectedQuantity}</span>
        </p>
      )}
    </fieldset>
      
</form>
{             auth.user==null?<button
                  
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                
                  onClick={() => setOpenAuthModal(true)}
                >
                  Add to Cart
                </button>  :

<button
                  
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                
                  onClick={()=>handleAddToCart()}
                >
                  Add to Cart
                </button>}
              
               <AuthModal
        open={openAuthModal}
        handleClose={() => setOpenAuthModal(false)}
      />
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{productStore?.product?.description}</p>
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {/* {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))} *}
                  </ul>
                </div>
              </div> */}

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  {/* <p className="text-sm text-gray-600">{product.details}</p> *}
                </div> 
              </div>*/}
            </div>
          </div>

        </section>

        {/* THIS IS FOR RATING NAD REVIEW  */}
        {/* <section className='lg:px-20' >
          <h1 className='font-semibold text-lg pb-4'>Ratings and Reviews</h1>
          <div className='border p-5'>
            <Grid container spacing={7}>

              <Grid item xs={7}  >

                <div className='space-y-5'>
                  {[1, 1, 1, 1].map((i) => <ProductReviewCard />)}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className='pb-1 text-xl font-semibold'> Product Rating</h1>
                <div className='flex items-center space-x-3'>
                  <Rating name="read-only" value={4} readOnly precision={0.5} size="large" />

                  <p className='text-sm opacity-70'> 100k+ Ratings</p>
                </div>

                  <Box className='mt-5 space-y-3 '>
                    <Grid container gap={2}>
                      <Grid item xs={2}>
                        <p className=''> Excellent</p>
                      </Grid>
                      <Grid item xs={7}  >
                        <LinearProgress  sx={{bgcolor:"#d0d0d0" ,borderRadius:4,height:7}} variant="determinate" value={20} color="success" className='w-[150px]'  />                         </Grid>
                        </Grid>
                        <Grid container  gap={2}>
                      <Grid item xs={2}>
                        <p className=''> Very Good</p>
                      </Grid>
                      <Grid item xs={7}  >
                        <LinearProgress  sx={{bgcolor:"#d0d0d0" ,borderRadius:4,height:7}} variant="determinate" value={60} color="success" className='w-[150px]'  />                         </Grid>
                        </Grid>
                        <Grid container gap={2}>
                      <Grid item xs={2}>
                        <p className=''> Good</p>
                      </Grid>
                      <Grid item xs={7}  >
                        <LinearProgress  sx={{bgcolor:"#d0d0d0" ,borderRadius:4,height:7}} variant="determinate" value={40} color="primary" className='w-[150px]'  />                         </Grid>
                        </Grid>
                        <Grid container gap={2}>
                      <Grid item xs={2}>
                        <p className=''> Average</p>
                      </Grid>
                      <Grid item xs={7}  >
                        <LinearProgress  sx={{bgcolor:"#d0d0d0" ,borderRadius:4,height:7}} variant="determinate" value={40} color="warning" className='w-[150px]'  />                         </Grid>
                        </Grid>
                        <Grid container gap={2} justifyContent="center" alignItems="center">
                      <Grid item xs={2} justifyContent="start" alignItems="start">
                        <p className=' justify-start items-start'> Poor</p>
                      </Grid>
                      <Grid item xs={7}  justifyContent="center" alignItems="center">
                        <LinearProgress  sx={{bgcolor:"#d0d0d0" ,borderRadius:4,height:7}} variant="determinate" value={40} color="error" className='w-[150px]'  />                         </Grid>
                        </Grid>
                        

                  </Box>
              </Grid>
            </Grid>

          </div>
        </section> */}

<section className="px-4 sm:px-10 lg:px-20 py-10 bg-white">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Ratings and Reviews</h1>

  <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Side - Reviews */}
      <div className="lg:col-span-7 space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <ProductReviewCard key={i} />
        ))}
      </div>

      {/* Right Side - Rating Summary */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Product Rating</h2>

        <div className="flex items-center gap-3">
          <Rating name="read-only" value={4} readOnly precision={0.5} size="large" />
          <span className="text-sm text-gray-500">100k+ Ratings</span>
        </div>

        <div className="mt-6 space-y-4">
          {/* Rating Row Component */}
          {[
            { label: 'Excellent', value: 20, color: 'bg-green-500' },
            { label: 'Very Good', value: 60, color: 'bg-green-400' },
            { label: 'Good', value: 40, color: 'bg-blue-400' },
            { label: 'Average', value: 40, color: 'bg-yellow-400' },
            { label: 'Poor', value: 40, color: 'bg-red-500' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-gray-600">{item.label}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>





 {/* this is similar product section */}
<section className='lg:px-20 pt-10 mb-10'>
  <h1 className='font-bold text-xl py-5 pb-4'>Similar Products</h1>

  <div className='flex flex-wrap gap-5 justify-center'> 
    {
       productStore.products && productStore.products?.content?.slice(params.productId,params.productId+4).map((item) => (
        <ProductCard key={item.id} data={item} />
      ))
    }
  </div>
</section>

      </div>
    </div>
  )
}
