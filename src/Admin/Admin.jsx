
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashBoard from './Components/DashBoard';
import CreateProductForm from './Components/CreateProductForm';
import ProductsTable from './Components/ProductsTable';
import OrderTable from './Components/OrderTable';
import CustomeTable from './Components/CustomeTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import AdminAccount from './Components/AdminAccount';
const menu=[
    {name:"Dashboard",path:"/admin"
    
},
 {name:"Products",path:"/admin/products",icon:<InboxIcon/>},

 {name:"Customers",path:"/admin/customers",icon:<InboxIcon/>},
 {name:"Orders",path:"/admin/orders",icon:<InboxIcon/>},
 {name:"Add Products",path:"/admin/products/create",icon:<InboxIcon/>},




];

const Admin = () => {
    const dispatch=useDispatch();
    const {auth}=useSelector(Store=>Store);
    const theme=useTheme();
    const isLargeScreen=useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible,setSideBarVisible]=useState(false);
    const navigate=useNavigate();
    
const drawer=(
    <Box 
    sx={{
        overflow:"auto",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
        ,height:"100%"
        ,width:"100%"
    }}>
        {/* {
            isLargeScreen && <Toolbar/>
        } */}
        <List>
            {menu.map((item,index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
                <ListItemButton>
                    <ListItemIcon>
                       {item.icon}
                             </ListItemIcon>
                             <ListItemText>
                                {item.name}
                             </ListItemText>
                </ListItemButton>
            </ListItem>)}
        </List>

        <List>
           <ListItem  disablePadding onClick={()=>navigate("/admin/account")}>
                <ListItemButton>
                    <ListItemIcon>

                        <AccountCircleIcon/>
                       
                             </ListItemIcon>
                             <ListItemText>Accounts</ListItemText>
                </ListItemButton>
            </ListItem>
        </List>

    </Box>
)

  return (
    <>

<div className='flex h-screen '>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />


 <div className='flex items-center  h-[100%] w-[15%] border ' >
     {drawer}
    
    </div>
    <div className='w-[85%] '>

        <Routes>
            <Route path="/" element={<DashBoard/>} />
            <Route path="/products/create" element={<CreateProductForm/>} />
            <Route path="/customers" element={<CustomeTable/>} />
            <Route path="/orders" element={<OrderTable/>} />
            <Route path="/products" element={<ProductsTable/>} />
            
            <Route path="/account" element={<AdminAccount/>} />

        </Routes>
    </div>



</div>

    </>
  )
}

export default Admin