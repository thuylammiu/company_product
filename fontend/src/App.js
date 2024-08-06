import './assets/css/App.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import appRouters from './routers/appRouters';
import GlobalContext from './context/GlobalContext';
import { useEffect, useState } from 'react';

function App() {
  const [state,setState] = useState({token:""});

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token && token !== ""){
      setState({...state, token})
    }
  },[])

  return (
    <GlobalContext.Provider value={[state,setState]}>
      <RouterProvider router={appRouters}/>
      <ToastContainer position='top-center' />
    </GlobalContext.Provider>
  );
}

export default App;
