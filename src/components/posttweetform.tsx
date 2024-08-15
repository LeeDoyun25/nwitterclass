import styled from "styled-components";
const Form=styled.form`
display:flex;
flex-direction:column;
gap: 10px;
`;
const TextArea=styled.textarea`
border: 2px solid white;
padding: 20px;
border-radius: 20px;
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
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-weight: 600;
cursor: pointer;
`;
const AttachFileInput=styled.input`display:none;`;
const SubmitBtn=styled.input`
background-color: #1d9bf0;
color: white;
border: none;
padding: 10px 0px;
border-radius:20px;
`;
export default function PostTweetForm(){
    return <Form>
        <TextArea placeholder="What's Happening?"/>
        <AttachFileBtn htmlFor="file">Add Photos</AttachFileBtn>
        <AttachFileInput id="file" type="file" accept="image/"/>
        <SubmitBtn type="submit" value='Post Tweet'/>
    </Form>
};