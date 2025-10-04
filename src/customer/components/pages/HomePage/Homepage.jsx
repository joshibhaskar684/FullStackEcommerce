import Maincarosel from "../../Homecarosel/Maincarosel";
import Homesectioncarosel from "../../Homesectioncarosel/Homesectioncarosel";
import { Homesectioncaroseldata } from "../../../../Data/Homesectioncarsouledata";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../State/Store";
import { useEffect } from "react";
import { findProducts, getAllProducts } from "../../../../State/Product/Action";
import ProductCard from "../../Product/ProductCard";


export default function Homepage(){
    
    
    return(
        <>
        <Maincarosel/>

    <Homesectioncarosel data={Homesectioncaroseldata} section={"Trending"}/>
        <Homesectioncarosel data={Homesectioncaroseldata} section={"Newest"}/>
        <Homesectioncarosel data={Homesectioncaroseldata} section={"Featured"}/>
  
        </>
    )
}