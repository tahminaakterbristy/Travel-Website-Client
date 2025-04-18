import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import Root from './Components/Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';





import AllSpot from './Components/Home/AllSpot/AllSpot.jsx';

import Spot from './Components/Home/Spot/Spot.jsx';
import ReviewForm from './Components/Home/ReviewForm/ReviewForm.jsx';
import AddTouristSpot from './Components/AddTouristsSpot/AddTouristsSpot.jsx';

import Profile from './Components/Profile/Profile.jsx';
import { ThemeProviderWrapper } from './Context/ThemeContext.jsx';
import FloatingSearch from './Components/FloatingSearch/FloatingSearch.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Privateroute from './Components/Privateroute/Privateroute.jsx';
import Mylist from './Components/Mylist/Mylist.jsx';

// import Authprovider from './Components/AuthProvider/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element:<Home></Home>, 
        // loader: () => fetch('/realestate.json')
      },
      {
        path: '/Login',
        element: <Login></Login>
      },
      {
        path: '/Register',
        element: <Register></Register>

      },
      {
        path: '/AllSpot',
        element: <Privateroute>
          <AllSpot></AllSpot>
        </Privateroute>
      },
      {
        path:'/spot/:id',
        element:<Privateroute>
          <Spot></Spot>
        </Privateroute>
        // loader: ({params}) => fetch(`https://my-server-black.vercel.app/countriedcard/${params.id}`)
        

      },
  
     
      {
        path:'/share-experience',
        element: <ReviewForm></ReviewForm>

      },
      
     
      {
        path:'/add-spot/:id',
        element: <AddTouristSpot></AddTouristSpot>,
        loader: ({params}) => fetch(`https://my-server-black.vercel.app/countriedcard/${params.id}`)

      },
   
     
      {
        path:'/my-profile',
        element: <Profile></Profile>

      },

      {
        path:'/Mylist',
        element: <Privateroute><Mylist></Mylist></Privateroute>
      },
      // {
      //   path:'/private',
      //   element: <Privateroute></Privateroute>
      // },
    
     {
      path: '/search',
      element: <FloatingSearch></FloatingSearch>
     },
    
    ]
  
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProviderWrapper>
<HelmetProvider>
        
 <div className='max-w-screen-xl mx-auto'>
 <RouterProvider router={router}></RouterProvider>
 </div>
</HelmetProvider>
   
    </ThemeProviderWrapper>
    </AuthProvider>
    
  </React.StrictMode>,
)
