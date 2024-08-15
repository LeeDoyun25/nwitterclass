import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../routes/firebase";
const Wrapper=styled.div`
display:grid;
gap: 20px;
padding: 50px 0px;
width: 100%;
max-width: 860px;
grid-template-columns:1fr 4fr;
height: 100%;
`;
const Menu=styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`;
const MenuItem=styled.div`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
border: 2px solid white;
width: 50px;
height: 50px;
border-radius: 50%;
svg{
    fill: white;
    width: 30px;
}
&.logout{
    border-color: tomato;
    svg{
        fill: tomato;
    }
}
`;
export default function Layout(){
    const Navigate=useNavigate();
    const onLogOutClicked=async ()=>{
        const check=confirm('Are you sure you want to Log Out?');
        if(check){
            await auth.signOut();
            Navigate('/login');
        };
    };
    return <Wrapper>
        <Menu>
            <Link to='/profile'>
                <MenuItem>
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" /></svg>          </MenuItem>
            </Link>
            <Link to='/'>
                <MenuItem>
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" /></svg>
                </MenuItem>
            </Link>
            <MenuItem onClick={onLogOutClicked} className="logout">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" /></svg></MenuItem>
        </Menu>
        <Outlet/>
    </Wrapper>
};