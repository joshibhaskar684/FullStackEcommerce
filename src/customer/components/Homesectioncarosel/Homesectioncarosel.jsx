import React, { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Homesectioncard from '../HomesectionCards/Homesectioncard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SimilarProductCard from '../Productdetails/SimilarProductcard'; // Assuming you have a CSS file for styles
export default function Homesectioncarosel({data,section}) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const responsive = {
    0: { items: 1.5 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const items = data.slice(0, 7).map((item) => (
    // <Homesectioncard  data={item}  />
    <SimilarProductCard key={item.id} data={item} />
  ));

  const slidePrevious = () => {
    carouselRef.current?.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current?.slideNext();
  };

  const handleSlideChanged = (e) => {
    setCurrentIndex(e.item);
  };

  const totalItems = items.length;
  const visibleItems = responsive[0].items;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= totalItems - visibleItems;

  return (
    <div className="relative px-4 lg:px-8 mb-10 m-2 bg-white ">

      <h2 className='text-2xl font-extrabold text-gray-800 py-5 m-2'>{section}</h2>
      {/* Carousel */}
      <div className="relative p-5 border-2 rounded-lg bg-white  items-center justify-center"> 
        <AliceCarousel 
        className="alice-carousel__stage"
  ref={carouselRef}
  items={items}
  responsive={responsive}
  disableButtonsControls
  disableDotsControls
  mouseTracking
  onSlideChanged={handleSlideChanged}
  controlsStrategy="responsive" // Add this
/>

      </div>

      {/* Left Arrow */}
      {!isAtStart && (
        <button
          onClick={slidePrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-1 bg-white hover:bg-gray-200 transition-colors duration-300 p-2 rounded-full shadow-lg"
          aria-label="Previous"
        >
          <KeyboardArrowLeftIcon className="text-black" />
        </button>
      )}

      {/* Right Arrow */}
      {!isAtEnd && (
        <button
          onClick={slideNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-1 bg-white hover:bg-gray-200 transition-colors duration-300 p-2 rounded-full shadow-lg"
          aria-label="Next"
        >
          <KeyboardArrowRightIcon className="text-black" />
        </button>
      )}
    </div>
  );
}
