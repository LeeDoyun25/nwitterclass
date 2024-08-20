import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button=styled.span`
margin-top: 50px;
background-color:white;
color: black;
font-weight: 500;
padding: 10px 20px;
width: 100%;
border-radius: 50px;
border: 0;
display: flex;
gap: 5px;
align-items: center;
justify-content: center;
cursor: pointer;
`;
const Logo=styled.img`
height: 25px;
`;
export default function GithubBtn(){
    const navigate=useNavigate();
    const onclick=async ()=>{
        try{
            const provider=new GithubAuthProvider();
            await signInWithPopup(auth,provider);
            navigate("/");
        } catch(e){
            console.error(e);
        };
    };    
    return <Button onClick={onclick}><Logo src='src\components\github-mark.svg'/>Continue With Github</Button>
};