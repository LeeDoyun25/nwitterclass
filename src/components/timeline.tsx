import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";
export interface ITweet{
    id:string;
    photo?:string;
    username:string;
    userId:string;
    tweet:string;
    createdAt:number;
};
const Wrapper=styled.div`
display: flex;
gap: 10px;
flex-direction: column;
overflow-y: scroll;
`;
export default function Timeline(){
    let unsubscribe:Unsubscribe|null=null;
    const [tweets,setTweets]=useState<ITweet[]>([]);
    useEffect(()=>{
        const fetchTweets=async()=>{
            const TweetsQuery=query(collection(db,'tweets'),orderBy('createdAt','desc'),limit(65));
            // const snapshot=await getDocs(TweetsQuery);
            // const Tweets=snapshot.docs.map(doc=>{
            //     const {tweet,createdAt,photo,username,userId}=doc.data();
            //     return {tweet,createdAt,photo,username,userId,id:doc.id}
            // });
            unsubscribe=await onSnapshot(TweetsQuery,(snapshot)=>{
                const Tweets=snapshot.docs.map(doc=>{
                    const {tweet,createdAt,photo,username,userId}=doc.data();
                    return {tweet,createdAt,photo,username,userId,id:doc.id};
                });
                setTweets(Tweets);
            })
        };
        fetchTweets();
        return ()=>{
            unsubscribe&&unsubscribe();
        };
    },[]);
    return <Wrapper>{tweets.map(tweet=><Tweet key={tweet.id} {...tweet}/>)}</Wrapper>
};