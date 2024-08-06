import React, { useEffect, useState } from 'react';
import '../../assets/css/Modal.css';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenAIChatbot from '../../pages/OpenAIChatbot';
import SettingsIcon from '@mui/icons-material/Settings';

const ChatbotModal = () => {
    const [isMinimized, setIsMinimized] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [isDelete,setIsDelete] = useState(false);
    const [isConfig,setIsConfig] = useState(false);

    useEffect(()=>{
        if(isDelete){
            setIsDelete(false);
        }
    },[isDelete])
    
    return isOpen && (
        <div className="modal-overlay">
        <div className={`modal ${isMinimized ? 'minimized' : ''}`}>
            <div className="modal-header">
                {
                    isMinimized ? <button style={{width:"100%",height:"100%"}} onClick={() => setIsMinimized(!isMinimized)}><ChatIcon/></button>
                    : <>
                        <button onClick={() => setIsMinimized(!isMinimized)}><ChatIcon/></button>
                        <button onClick={()=>setIsDelete(true)}><DeleteIcon/></button>
                        <button onClick={()=>{console.log(isConfig);setIsConfig(!isConfig)}}><SettingsIcon/></button>
                        <button onClick={() => setIsMinimized(!isMinimized)}><MinimizeIcon/></button>
                        <button onClick={() => setIsOpen(!isOpen)}><CloseIcon/></button>
                    </>
                }
                
            </div>
            {!isMinimized && <div className="modal-content">
            <OpenAIChatbot setIsConfig={setIsConfig} isModal={true} isConfig={isConfig} isDelete={isDelete}/>
            </div>}
        </div>
        </div>
    );
};

export default ChatbotModal;
