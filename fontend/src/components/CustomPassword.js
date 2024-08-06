import { useEffect, useState } from "react";
import FormRow from "./common/FormRow";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

//import PasswordChecklist from "react-password-checklist"
//  react-password-checklist

const CustomPassword = ({ initPassword, initConfirmPassword, isShowConfirmPassword, handleChange, setIsValidPassword }) => {
    
    const [password, setPassword] = useState(initPassword);
    const [confirmPassword, setConfirmPassword] = useState(initConfirmPassword);
    const hasTenCharacters = password.length >= 10;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const isConfirmPasswordMatched = isShowConfirmPassword && password && confirmPassword && (password === confirmPassword)

    useEffect(()=>{
        setConfirmPassword("");
        setPassword("");
    },[isShowConfirmPassword])

    useEffect(()=>{
        const isValidPassword = hasTenCharacters && hasSpecialCharacter && hasLowerCase && hasUpperCase && isConfirmPasswordMatched
        setIsValidPassword(!isShowConfirmPassword || isValidPassword);
    })
    const onPasswordChanged = (e)=>{
        if(e.target.name === "password"){
            setPassword(e.target.value);
        } else if(e.target.name === "confirmPassword"){
            setConfirmPassword(e.target.value);
        }
        handleChange(e);
    }

    const showIcon =(condition) =>{
        return condition ? <CheckCircleOutlineIcon sx={{fontSize:"14px"}}/> : <CloseIcon sx={{fontSize:"14px"}}/>
    }

    // const PasswordCheckListComponent = () => <PasswordChecklist
    //     rules={["minLength","specialChar","number","capital","lowercase","match"]}
    //     minLength={10}
    //     value={password}
    //     valueAgain={confirmPassword}
    //     onChange={(isValid) => {
    //         setIsValidPassword(isValid);
    //     }}
    // />
    return <>
        <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={onPasswordChanged}
        />
        {
            isShowConfirmPassword && (
                <FormRow
                type='password'
                name='confirmPassword'
                labelText="Confirm Password"
                value={confirmPassword}
                handleChange={onPasswordChanged}
                />
            )
        }
        {isShowConfirmPassword && <ul style={{fontSize:"14px", listStyleType:"none"}}>
            <li data-testid="tenChar-check" style={{ color: hasTenCharacters ? 'green' : 'red' }}>
                {showIcon(hasTenCharacters)} <i>At least 10 letters or digits</i>
            </li>
            <li data-testid="special-check" style={{ color: hasSpecialCharacter ? 'green' : 'red' }}>
                {showIcon(hasSpecialCharacter)} <i>Contains at least one special character</i>
            </li>
            <li data-testid="lowercase-check" style={{ color: hasLowerCase ? 'green' : 'red' }}>
                {showIcon(hasLowerCase)} <i>Has a lowercase letter</i>
            </li>
            <li data-testid="uppercase-check" style={{ color: hasUpperCase ? 'green' : 'red' }}>
                {showIcon(hasUpperCase)} <i>Has an uppercase letter</i>
            </li>
            {isShowConfirmPassword && <li data-testid="confirmPassword-check" style={{ color: isConfirmPasswordMatched ? 'green' : 'red' }}>
                {showIcon(isConfirmPasswordMatched)} <i>Confirm password matches</i>
            </li>}
        </ul>}

        {/* <PasswordCheckListComponent/> */}
    </>
            

        
};

export default CustomPassword;