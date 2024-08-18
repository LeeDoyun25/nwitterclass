import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Switcher, Title, Wrapper,Form } from "../components/authcomponent";
import GithubBtn from "../components/githubbtn";
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
        setError('');
        if(!Name||!Email||!Password||isLoading){
            return;
        };
        try{
            setLoading(true);
            const credential = await createUserWithEmailAndPassword(auth,Email,Password);
            console.log(credential.user);
            await updateProfile(credential.user,{displayName:Name,});
            navigate("/");
        } catch(e){
            if (e instanceof FirebaseError){
                setError(e.message);
            };
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
        {error!==''?<Error>{error}</Error>:null}
        <Switcher>Already have an account?<Link to={"/login"}>Go Log in! &rarr;</Link></Switcher>
        <GithubBtn/>
    </Wrapper>;
};