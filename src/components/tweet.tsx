import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
const Wrapper=styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
padding: 20px;
border: 1px solid rgba(255,255,255,0.5);
border-radius: 50px;
`;
const Column=styled.div``;
const Photo=styled.img`
width: 100px;
border-radius: 15px;
height: 100px;
`;
const UserName=styled.span`
font-weight: 600;
font-size: 15px;
`;
const Payload=styled.p`
margin: 10px 0px;
font-size: 18px;
`;
const DeleteBtn=styled.button`
background-color: tomato;
color: white;
font-weight: 600;
border: 0;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
cursor: pointer;
`;
export default function Tweet({username,photo,tweet,userId,id}:ITweet){
    const user=auth.currentUser;
    const ondelete=async()=>{
        const check=confirm('Do you REALLY want to DELETE THIS TWEET?');
        if(!check||user?.uid!==userId){
            return;
        };
        try {
            await deleteDoc(doc(db,'tweets',id));
            if (photo){
                const photoRef=ref(storage,`tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            };
        } catch(e){
            console.log(e);
        } finally{};
    };
    return (<Wrapper><Column>
    <UserName>{username}</UserName>
    <Payload>{tweet}</Payload>
    {user?.uid===userId?<DeleteBtn onClick={ondelete}>Delete</DeleteBtn>:null}
</Column>
<Column>
{photo?<Photo src={photo}/>:null}
</Column>
</Wrapper> )
};