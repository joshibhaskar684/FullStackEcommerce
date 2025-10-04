import React, { useEffect } from 'react';
import Achievement from './DashBoardComponent/Acheivement';
import MonthlyOverview from './DashBoardComponent/MonthlyOverview';
import ProductTable from './DashBoardComponent/ProductTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../State/Product/Action';
import { getadminOrders } from '../../State/AdminOrders/Action';
import LatestOrder from './DashBoardComponent/LatestOrder';
import { getCustomers } from '../../State/AdminCustomer/Action';
import CustomerInfo from './DashBoardComponent/CustomerInfo';

function DashBoard() {

  const { productStore, adminOrder,adminCustomer } = useSelector(Store => Store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getadminOrders());
    dispatch(getCustomers());
  }, []);

  console.log("product store in dashboard", productStore);
  console.log("admin order in dashboard", adminOrder);
  console.log("admin customer  in das" ,adminCustomer);
  const totalrevenu = adminOrder.orders?.reduce((acc, order) => (order.paymentDetails.paymentStatus == "COMPLETED" ? acc + Number(order.totalDiscountedPrice || 0) : acc), 0);
  const productSold = adminOrder.orders?.reduce((acc, order) => (order.paymentDetails.paymentStatus == "COMPLETED" ? acc + Number(order.totalItem) : acc), 0);
  const monthorder = adminOrder?.orders?.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return orderDate >= thirtyDaysAgo ? acc + 1 : acc;
  }, 0);

  return (
    <>
      <div className="p-4 py-10 h-full overflow-y-scroll ">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <div className="">
            <Achievement monthorder={monthorder} />
          </div>
          <div className="">
            <MonthlyOverview product={productStore.products?.length} revenue={totalrevenu} totalOrder={adminOrder?.orders?.length} productSold={productSold} />
          </div>
        </div>
        <div className='grid grid-cols-1  gap-4 mt-10 mb-10  md:grid-cols-2 '>
          <div className='flex flex-col '>
            <h1 className='p-5 text-2xl font-bold text-gray-800'>📦 Latest Orders</h1>
            <div className=' w-full  space-y-10 overflow-y-scroll h-[500px] '>
{adminOrder.orders
  ?.filter(
    (row) =>
      row.paymentDetails.paymentStatus === "COMPLETED" &&
      row.orderStatus === "PLACED"
  )
  .map((row) => (
    <LatestOrder key={row.id} order={row} />
  ))}



            </div>
          </div>


          <div className='flex flex-col'>
            <h1 className='p-5 text-2xl font-bold text-gray-800'> Recent Customer</h1>
            <div>
              {
            adminCustomer.customer.map((customer)=>(<CustomerInfo key={customer.id} customer={customer}/>))
          }
              </div>
          </div>
          

        </div>

        <div className="grid grid-cols-1  gap-4 mt-10 mb-10  ">
          <h1 className="p-5 text-2xl font-bold text-gray-800">🛍 Latest Products</h1>
          <div className=" mt-10 mb-10 w-full  space-y-10">


            {productStore.products
              ?.slice(productStore.products.length - 5, productStore.products.length)
              .map((item) => <ProductTable key={item.id} item={item} />)}

          </div>
        </div>

      </div>

    </>
  );
}

export default DashBoard;
