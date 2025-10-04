import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { FaUsers, FaBoxOpen, FaDollarSign } from 'react-icons/fa';

const salesData = [
  { stats: "0", title: "Product Sold", icon: <TrendingUpIcon />, color: "text-blue-500" },
  { stats: "0", title: "Total Order", icon: <FaUsers />, color: "text-purple-500" },
  { stats: "", title: "Products", icon: <FaBoxOpen />, color: "text-yellow-500" },
  { stats: "₹0", title: "Revenue", icon: <FaDollarSign />, color: "text-green-500" },
];

function StatCard({ stats, title, icon, color }) {
  return (
    <div className="bg-gray-100 p-4 rounded flex flex-wrap items-center gap-4 transition duration-300 hover:shadow-lg cursor-pointer">
      <div className={`text-2xl ${color} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold text-gray-800 truncate">{stats}</p>
        <p className="text-sm text-gray-600 truncate">{title}</p>
      </div>
    </div>
  );
}


function MonthlyOverview({product ,revenue,totalOrder ,productSold}) {
  salesData[2].stats=`${product}`;
  salesData[3].stats=`₹${revenue}`;
  salesData[1].stats=`${totalOrder}`;
  salesData[0].stats=`${productSold}`;
  return (
    <div className="p-6 bg-white shadow-md w-full space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1"> Overview</h2>
        <p className="text-sm text-gray-600">Total Overview </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {salesData.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default MonthlyOverview;
