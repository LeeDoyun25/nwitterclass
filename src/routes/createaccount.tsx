import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
const Title=styled.h1`
font-size: 42px;
`;
const Wrapper=styled.div`
height:100%;
display: flex;
flex-direction: column;
align-items: center;
width: 420px;
padding: 50px 0px;
`;
const Form=styled.form`margin-top:50px;
display:flex;
flex-direction:column;
gap:10px;
width:100%;`;
const Input=styled.input`
padding:10px 20px;
border-radius: 50px;
border: none;
width: 100%;
font-size: 16px;
&[type='submit']{
    cursor: pointer;
    &hover{
        opacity: 0.8;
    }
    }
`;
const Error=styled.span`
    font-weight: 600;
    color:tomato;
`;
export default function Create_Account(){
    const navigate=useNavigate();
    const [isLoading,setLoading]=useState(false);
    const [Name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [error,setError]=useState('');
    const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {target:{name,value}}=e;
        if (name==="name"){
            setName(value);
        } else if (name==='password'){
            setPassword(value);
        } else if (name==='email'){
            setEmail(value);
        };
    };
    const onsubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!Name||!Email||!Password||isLoading){
            return;
        };
        try{
            setLoading(true);
            const credential=await createUserWithEmailAndPassword(auth,Email,Password);
            console.log(credential.user);
            await updateProfile(credential.user,{displayName:Name,});
            navigate("/");
        } catch(e){

        } finally{
            setLoading(false);
        };
    };
    return <Wrapper>
        <Title>Join 𝕏</Title>
        <Form onSubmit={onsubmit}>
            <Input name="name" onChange={onchange} value={Name} placeholder="Name" type="text" required/>
            <Input name="email" onChange={onchange} value={Email} placeholder="E-mail" type="text" required/>
            <Input name="password" onChange={onchange} value={Password} placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading?"Loading":"Create Account"}/>
        </Form>
    </Wrapper>
    {error!==''?<Error>{error}</Error>:null};
};