import { useState } from "react";
import styled from "styled-components";
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
    const onsubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{

        } catch(e){

        } finally{
            setLoading(false);
        };
    };
    return <Wrapper>
        <Title>Log into ✅</Title>
        <Form onSubmit={onsubmit}>
            <Input name="name" onChange={onchange} value={Name} placeholder="Name" type="text" required/>
            <Input name="email" onChange={onchange} value={Email} placeholder="E-mail" type="text" required/>
            <Input name="password" onChange={onchange} value={Password} placeholder="Password" type="text" required/>
            <Input type="submit" value={isLoading?"Loading":"Create Account"}/>
        </Form>
    </Wrapper>
    {error!==''?<Error>{error}</Error>:null};
};