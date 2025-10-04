import React from 'react';

function SimilarProductCard({ data }) {
  const { image, title, brand } = data;

  return (
     <article className="min-w-[150px] max-w-[180px] sm:min-w-[180px] h-[300px] bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-gray-50 group m-1">
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={data.imageUrl}
          alt={data.title || 'Product Image'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-3 space-y-1">
        <p className="text-xs text-gray-500 font-medium uppercase truncate">{data.brand}</p>
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{data.title}</h2>
      </div>
    </article>
  );
}

export default SimilarProductCard;
