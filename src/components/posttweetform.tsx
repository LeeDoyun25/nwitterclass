import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const Form=styled.form`
display:flex;
flex-direction:column;
gap: 10px;
`;
const TextArea=styled.textarea`
border: 2px solid white;
padding: 20px;
border-radius: 20px;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size:16px;
color: white;
background-color: black;
width: 100%;
resize: none;
&::placeholder{
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
&:focus{
    outline: none;
    border-color: #1d9bf0;
}
`;
const AttachFileBtn=styled.label`
padding: 10px 0px;
color: #1d9bf0;
text-align: center;
border-radius: 20px;
border: 1px solid #1d9bf0;
font-size: 14px;
font-weight: 600;
font-family: sans-serif;
cursor: pointer;
`;
const AttachFileInput=styled.input`display:none;`;
const SubmitBtn=styled.input`
background-color: #1d9bf0;
color: white;
border: none;
padding: 10px 0px;
border-radius:20px;
font-size: 16px;
cursor: pointer;
&:hover,:active{
    opacity: 0.9;
}
`;
export default function PostTweetForm(){
    const [isLoading,setLoading]=useState(false);
    const [tweet,setTweet]=useState('');
    const [file,setFile]=useState<File|null>(null);
    const onchange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTweet(e.target.value);
    };
    const onFilechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {files}=e.target;
        if (files&&files.length===1){
            setFile(files[0]);
        };
    };
    const onsubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const currentuser=auth.currentUser;
        if(!currentuser||isLoading||tweet===''||tweet.length>180){
            return;
        };
        try{
            setLoading(true);
            const doc=await addDoc(collection(db,"tweets"),{
                tweet,
                createdAt:Date.now(),
                username:currentuser.displayName||'Anonymous',
                userId:currentuser.uid,
            });
            if (file){
                const locationRef=ref(storage,`tweets/${currentuser.uid}/${doc.id}`);
                const result=await uploadBytes(locationRef,file);
                const url=await getDownloadURL(result.ref);
                await updateDoc(doc,{
                    photo:url,
                });
            };
            setTweet('');
            setFile(null);
        } catch(e){
            console.log(e);
        } finally{
            setLoading(false);
        }
    };
    return <Form onSubmit={onsubmit}>
        <TextArea required rows={5} maxLength={400} onChange={onchange} value={tweet} placeholder="What's Happening?"/>
        <AttachFileBtn htmlFor="file">{file?'Photo Added✅':'Add Photo'}</AttachFileBtn>
        <AttachFileInput onChange={onFilechange} id="file" type="file" accept="image/"/>
        <SubmitBtn type="submit" value={isLoading?'Posting....':'Post Tweet'}/>
    </Form>
};