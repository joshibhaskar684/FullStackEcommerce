import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts, getAllProducts } from '../../State/Product/Action';
import { toast } from 'react-toastify';

function ProductsTable() {

  
const dispatch=useDispatch();

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = () => {
  dispatch(getAllProducts());
};

const {productStore}=useSelector(Store=>Store);
const product=productStore;


const handleProductDelete = async (id) => {
  try {
    await dispatch(deleteProduct(id));
    toast.success("✅ Product deleted successfully!");
    fetchProducts();
  } catch (err) {
    toast.error(`❌ ${err.message || "Failed to delete product"}`);
  }
};


// useEffect(()=>{
//     const data={
//       category:"",
//       colors:[],
//       sizes:[],
//       minPrice:null,
//       maxPrice:null,
//       minDiscount:0,
//       sort:"price_low"
//       ,pageNumber:1,
//       pageSize:10,
//       stock:" "
//     }
//     dispatch(findProducts(data));

//   },[product.deletedProduct]);

  return (




    <div className='p-4 py-10 h-full overflow-y-scroll'>

<h1 className='p-5 text-2xl font-bold'>All Products</h1>

     <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-700 bg-white">
        <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
          <tr>
            
            <th scope="col" className="px-6 py-4">P.Id</th>

            <th scope="col" className="px-6 py-4">Image</th>
            <th scope="col" className="px-6 py-4 text-left">Title</th>
            <th scope="col" className="px-6 py-4 text-left">Category</th>
            <th scope="col" className="px-6 py-4 text-right">Price</th>
            <th scope="col" className="px-6 py-4 text-right"> Quantity</th>
            
            <th scope="col" className="px-6 py-4 text-right"> Delete</th>
          </tr>
        </thead>
        <tbody>

         
          {product.products?.length === 0 ? (
  <tr>
    <td colSpan={6} className="text-center py-4 text-gray-500">
      No product found
    </td>
  </tr>
) : (
  product.products?.map((row, index) => (
    <tr
      key={row.id}
      className={`border-b ${index === product.products.length - 1 ? '' : 'last:border-0'}`}
    >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
       {row.id}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <Avatar src={row.imageUrl} />
      </th>
      <td className="px-6 py-4 text-left max-w-[200px] truncate">
  {row.title}
</td>

      <td className="px-6 py-4 text-left">
        {row.parentparentCategoryName+" / "+row.parentCategoryName + " / " + row.categoryName}
      </td>
      <td className="px-6 py-4 text-right">{row.discountedPrice}</td>
      <td className="px-6 py-4 text-right">{row.quantity}</td>
      <td className="px-6 py-4 text-right">
        <Button onClick={() => handleProductDelete(row.id)}>DELETE</Button>
      </td>
    </tr>
  ))
)}

        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ProductsTable