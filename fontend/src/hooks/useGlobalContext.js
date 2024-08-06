import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function useGlobalContext(needCheck=true){
    const [globalContext,setGlobalContext] = useContext(GlobalContext);
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(needCheck && (!globalContext.token || globalContext.token ==="")){
            navigate("/login");
        }
    },[window.location.href]);

    return [globalContext,setGlobalContext];

}

export default useGlobalContext;