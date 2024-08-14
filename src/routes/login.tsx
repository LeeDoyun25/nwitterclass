import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Error, Input, Switcher, Title, Wrapper,Form } from "../components/authcomponent";
import GithubBtn from "../components/githubbtn";
export default function Create_Account(){
    const navigate=useNavigate();
    const [isLoading,setLoading]=useState(false);
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [error,setError]=useState('');
    const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {target:{name,value}}=e;
        if (name==='password'){
            setPassword(value);
        } else if (name==='email'){
            setEmail(value);
        };
    };
    const onsubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        if(!Email||!Password||isLoading){
            return;
        };
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth,Email,Password);
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
        <Title>Log into 𝕏</Title>
        <Form onSubmit={onsubmit}>
            <Input name="email" onChange={onchange} value={Email} placeholder="E-mail" type="text" required/>
            <Input name="password" onChange={onchange} value={Password} placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading?"Loading":"Log in"}/>
        </Form>
        {error!==''?<Error>{error}</Error>:null}
        <Switcher>Don't have an account?<Link to={"/createaccount"}>Create One! &rarr;</Link></Switcher>
        <GithubBtn/>
    </Wrapper>;
};