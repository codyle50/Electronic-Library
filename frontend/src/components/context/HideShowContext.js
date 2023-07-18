import React, {createContext, useState} from 'react';

const HideShowContext = createContext()

export default HideShowContext;

export const HideShowProvider =({children})=> {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const contextData = {
        show: show, handleClose: handleClose, handleShow: handleShow
    }
    return(
        <HideShowContext.Provider value={contextData}>
            {children}
        </HideShowContext.Provider>
    )
}