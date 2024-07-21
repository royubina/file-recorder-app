import React, { Fragment, useEffect } from 'react'

interface ModalMainProps {
    isVisible: Boolean; 
    onClose: () => void;
    children: React.ReactNode;
}

const ModalMain: React.FC<ModalMainProps> = ({ isVisible, onClose, children }) => {
  if(!isVisible) return null;

  return (
    <Fragment>
        <div 
            id="wrapper"
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="w-[600px] flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={() => onClose()}>X</button>
                <div className="bg-white p-5 rounded">
                    {children} 
                </div>
            </div> 
        </div>
    </Fragment>
  )
}

export default ModalMain