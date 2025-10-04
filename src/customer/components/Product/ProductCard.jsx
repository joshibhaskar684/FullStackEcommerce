import "./Productcard.css"
import { Link, useNavigate } from "react-router-dom";
function ProductCard({data}) {
  const navigate = useNavigate();
  return (
<div onClick={()=>navigate(`/product/${data.id}`)} className="productcard w-[15rem] m-3 transition-all cursor-pointer shadow-sm hover:shadow-xl">
<div className="h-[15rem] overflow-hidden ">
  <img className="h-full w-full object-cover object-left-top "
   src={data.imageUrl}
    loading="lazy" alt={data.title}>
   </img>
</div>
<div className=" textpart bg-white p-3">

<div>
  <Link to="/productdetails" className="font-bold opacity-60">{data.brand}</Link>
  <p className="line-clamp-2">
   {data.title}
  </p>
</div >
<div className="flex items-center space-x-2">
<p className="font-semibold">{data.discountedPrice}</p>
<p className="opacity-50 line-through ">{data.price}</p>
<p className="text-green-600 font-semibold">{data.discountedPresent+"%"}</p>
</div>


  </div>
</div>
    
  )
}

export default ProductCard;