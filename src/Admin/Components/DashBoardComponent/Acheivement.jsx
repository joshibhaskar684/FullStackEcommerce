import React from 'react';

function Achievement({monthorder}) {
  return (
    <div className="relative bg-white p-6 shadow-lg w-full h-full  overflow-hidden">
      <div className="relative z-10 space-y-2">
        <h6 className="text-lg font-semibold tracking-wide">Shop with Vhbuyio</h6>
        <p className="text-gray-400">Congratulations 😘 You have got </p>
        <p className="text-2xl font-bold text-green-600">{monthorder}</p>
        <p className="text-gray-400">Orders this month </p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          View Sales
        </button>
      </div>

      {/* Trophy Image */}
      <img
        src="https://media.istockphoto.com/id/899130678/vector/star-ribbon-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=QGJcNts82TIFhUPyxda1YnzVODUuKrhCTFd0x8ORij0="
        alt="trophy"
        className="absolute bottom-4 right-4 w-20 h-20 opacity-70 z-0"
      />
    </div>
  );
}

export default Achievement;
