import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { toast } from 'react-toastify';

const initialSizes = [
  { name: 'S', quantity: 0 },
  { name: 'M', quantity: 0 },
  { name: 'L', quantity: 0 },
];

// Static category options
const topCategories = ['Women', 'Men'];

const secondCategories = [
  'Clothing',
  'Accessories',
  'Brands',
];

const thirdCategories = [
  'Tops',
  'Sarees',
  'Dresses',
  'Pants',
  'Denim',
  'Sweaters',
  'T-Shirts',
  'Jackets',
  'Activewear',
  'Browse All',
  'Watches',
  'Wallets',
  'Bags',
  'Sunglasses',
  'Hats',
  'Belts',
  'Full Nelson',
  'My Way',
  'Re-Arranged',
  'Counterfeit',
  'Significant Other',
  'Other',
  'Suit',
];


function CreateProductForm() {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    discountedPrice: '',
    discountedPresent: '',
    quantity: '',
    brand: '',
    color: '',
    imageUrl: '',
    sizes: initialSizes,
    topLavelCategory: '',
    secondLavelCategory: '',
    thirdLavelCategory: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizesChange = (e, index) => {
    const updatedSizes = [...productData.sizes];
    updatedSizes[index].quantity = Number(e.target.value);
    setProductData((prevState) => ({
      ...prevState,
      sizes: updatedSizes,
    }));
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
   if (productData.price > 0 && productData.discountedPrice >= 0) {
      const discount = ((productData.price - productData.discountedPrice) / productData.price) * 100;
      productData.discountedPresent=discount;
    }

  try {
    console.log("Submitting product:", productData);
    await dispatch(createProduct(productData));
    toast.success("✅ Product created successfully!");
  } catch (err) {
    console.error("❌ Error creating product:", err);
    toast.error(`❌ ${err.message || "Failed to create product"}`);
  }
};


  return (
    <div className='p-4 py-10 h-full overflow-y-scroll'>
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image URL */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Brand */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Title */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Color */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleChange}
            placeholder="Color"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Original Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Discounted Price */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={productData.discountedPrice}
            onChange={handleChange}
            placeholder="Discounted Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Discounted % */}
        

        {/* Quantity */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>



        {/* Top Level Category */}
        <div className="w-full">
          <label className="  block mb-2 text-gray-700 font-medium">Top Level Category</label>
          <select
            name="topLavelCategory"
            value={productData.topLavelCategory}
            onChange={handleChange}
            className="w-[100%] px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Top Level Category</option>
            {topCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Second Level Category */}
        <div className="w-full">
          <label className="block mb-2 text-gray-700 font-medium">Second Level Category</label>
          <select
            name="secondLavelCategory"
            value={productData.secondLavelCategory}
            onChange={handleChange}
            className="w-[100%] px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Second Level Category</option>
            {secondCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Third Level Category */}
        <div className="w-full ">
          <label className=" block mb-2 text-gray-700 font-medium">Third Level Category</label>
          <select
            name="thirdLavelCategory"
            value={productData.thirdLavelCategory}
            onChange={handleChange}
            className="w-[100%] px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Third Level Category</option>
            {thirdCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 w-full">
          <label className="block mb-2 text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Sizes */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700 font-medium">Sizes & Quantities</label>
          <div className="flex flex-wrap gap-4">
            {productData.sizes.map((sz, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-gray-800 font-medium mb-1">{sz.name}</span>
                <input
                  type="number"
                  min={0}
                  value={sz.quantity}
                  onChange={(e) => handleSizesChange(e, index)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Preview */}
        {productData.imageUrl && (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <img
              src={productData.imageUrl}
              alt="Preview"
              className="h-48 object-contain border p-2 rounded shadow"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateProductForm;
