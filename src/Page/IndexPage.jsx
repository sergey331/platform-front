import React,{useEffect} from "react";
import  {useNavigate} from "react-router-dom";

const IndexPage = () => {
    const history = useNavigate();

    useEffect(() => {
        console.log('t')
        let token = localStorage.getItem('token')
        if (token === null) {
            console.log('token')
           return  history('/login')
        }
    },[])
    return (
        <div>
s
        </div>
    )
}

export default IndexPage;
