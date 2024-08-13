import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Create_Account from "./routes/createaccount";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loadingscreen";

const Router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/createaccount',
    element:<Create_Account/>
  }
]);
const GlobalStyle=createGlobalStyle`${reset};
*{box-sizing:border-box;}
body{background-color:black;color:white;}`;
function App() {
  const [isLoading,setLoading]=useState(true);
  const init=async()=>{
    //wait for firebase
    setTimeout(()=>setLoading(false),2000);
  };
  useEffect(()=>{init()},[]);
  return (<><GlobalStyle/>{isLoading?<LoadingScreen/>:<RouterProvider router={Router}/>}</>);
};
export default App;