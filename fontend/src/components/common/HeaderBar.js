import '../../assets/css/HeaderBar.css'
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/HeaderBar.css';
import { useContext,  useState } from 'react';
import GlobalContext from '../../context/GlobalContext';


const HeaderBar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [globalContext,setGlobalContext] = useContext(GlobalContext);
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        setGlobalContext({});
        setShowLogout(!showLogout);
        navigate("/login");
    }

    return  (
        <nav className="header-bar">
            <div className='product-page'>
            <div className='logo'>
                <img src="/images/logo.svg" alt="logo" />
            </div>
            <div className="link-container">
                    <Link className={window.location.href.split("/").includes("home") && "active"} to='/home'>Home</Link>
                    <Link className={window.location.href.split("/").includes("openAI") && "active"} to='/openAI'>Open AI</Link>
            </div>
            { globalContext.token && globalContext.token !=="" &&
                <div className='nav-center'>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                        </svg>{localStorage.getItem('email') && localStorage.getItem('email').includes("@") 
                        && localStorage.getItem('email').split('@')[0]}<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
                        </button>
                        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                            <button
                            type='button'
                            className='dropdown-btn'    
                            onClick={logout}                        
                            >
                            logout
                            </button>
                        </div>
                </div>
            </div>
            }
            </div>
            
        </nav>
    )
}

export default HeaderBar;