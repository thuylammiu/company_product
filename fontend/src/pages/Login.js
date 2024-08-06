import FormRow from '../components/common/FormRow'
import '../assets/css/Login.css';
import { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {loginUser, saveUser} from '../api/userApi';
import { useNavigate, } from "react-router";
import CustomPassword from '../components/CustomPassword';
import GlobalContext from '../context/GlobalContext';

const Login = ({isMember}) => {
    const [globalContext,setGlobalContext] = useContext(GlobalContext);
    const initialState = {
        email: '',
        password: '',
        confirmPassword:'',
        isMember: isMember,
    };

    const [values, setValues] = useState(initialState);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(globalContext.token && globalContext.token !== "" ){
            navigate("/home")
        }    
    },[])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
        if(name==="email"){
            const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e.target.value);
            setIsValidEmail(isValidEmail);
            if(isValidEmail){
                setEmailErrorMsg(null);
            }
        }
    };

    const toggleMember = () => {
        setValues({isMember: !values.isMember , email:'', password:'', confirmPassword:''});
    };

    const onSubmit = async (e) => {
    
    e.preventDefault();
    if(!isValidEmail || !isValidPassword){
        return;
    }
    const { email, password, confirmPassword, isMember } = values;
    let response;

    if (!email || !password || (!isMember && !confirmPassword)) {
        toast.error('Please fill out all fields');
        return;
    }

    if (isMember) {
        response = await loginUser({ email, password });
    }
    else
    {
        response = await saveUser({ email, password });
    }
    
    if(!response){ // also catch for network error
        toast.error("Network Error");
        return;
    }

    if (response && response.data.success ) 
    {
        toast.success(!values.isMember ? 'Register successfully!' : 'Login successfully!');
        if (!values.isMember)
        {
            setValues(initialState);
            toggleMember();
        }
        else
        {
            debugger;
            localStorage.setItem('token', response.data.data);
            localStorage.setItem('email', email);
            setGlobalContext({...globalContext,token:response.data.data, username: email});
            navigate('/home');
            console.log(response);
        }
    }
    else if (!response.data.success)
    {
        toast.error(response.data.error);
    }
    else{
        toast.error('Login fail!');
    }
    };
    
    const [emailErrorMsg, setEmailErrorMsg] =useState();
    const emailOnBlur = (e)=>{
        if(!values.isMember && values.email !== "" && !isValidEmail){
            //e.target.focus();
            setEmailErrorMsg(!values.isMember ? (!isValidEmail) ? "Invalid email format": null :null);
            //toast.error("Invalid email format. Please use a format like 'example@example.com'.");
        }else{
            setEmailErrorMsg(null);
        }
    }

    return (!globalContext.token || globalContext.token === "") && (
        <form className="register-form" onSubmit={onSubmit}> 
            <h3>{!values.isMember ? 'Register' : 'Login'}</h3>           
            <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
            handleBlur={emailOnBlur}
            errorMsg={emailErrorMsg}
            />

            <CustomPassword
            initPassword={values.password}
            initConfirmPassword={values.confirmPassword}
            isShowConfirmPassword={!values.isMember}
            handleChange={handleChange}
            setIsValidPassword={setIsValidPassword}
            />
            <button type='submit' className={`btn btn-block ${(values.isMember ||( isValidEmail && isValidPassword )? "enabled" : "submit-button disabled")}`}> 
            Submit
            </button>
        
            <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' className='member-btn' onClick={toggleMember}>
                {values.isMember ? 'Register' : 'Login'}
            </button>
            </p>

        </form>
    )
}

export default Login;