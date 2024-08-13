import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Create_Account from "./routes/createaccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loadingscreen";
import { auth } from "./routes/firebase";
const Wrapper=styled.div`
height:100%;
display: flex;
justify-content: center;
`;
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
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(()=>{init()},[]);
  return (<Wrapper><GlobalStyle/>{isLoading?<LoadingScreen/>:<RouterProvider router={Router}/>}</Wrapper>);
};
export default App;