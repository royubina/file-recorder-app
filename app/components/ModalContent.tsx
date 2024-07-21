'use client'

import React, { useState, FormEvent, Fragment } from 'react'
import FileUploadForm from './FileUploadForm';

interface ModalContentProps {
    action: string; 
    item: any;
    handleSubmit: any;
}

const ModalContent: React.FC<ModalContentProps> = ({ action, item, handleSubmit }) => {
    const [images, setImages] = useState<File[]>([]);

    return (
        <Fragment>
            <div className="p-6">
                <div>
                    <h1 className="text-xl font-bold my-4">{action} Record</h1>
                </div>
                <form className="space-y-2" onSubmit={(e) => {handleSubmit(e, item.uuid, images)}}>
                    <div className="space-y-0.5">
                        <label className="block text-black text-sm font-small">
                            Record
                        </label>
                        <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        // placeholder={item ? item.name : "Record"}
                        defaultValue={item ? item.name : "Record"}
                        readOnly={action==="View" || action==="Delete"}
                        required
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="block text-black text-sm font-small">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                            // placeholder={item ? item.description : "Description"}
                            defaultValue={item ? item.description : "Description"}
                            readOnly={action==="View" || action==="Delete"}
                            required
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="block text-black text-sm font-small">
                            Upload File/s
                        </label>
                        <FileUploadForm itemImages={item.images} action={action}/>
                    </div>
                    { action !== "View" &&
                        <div className="flex flex-row justify-end">
                            <button 
                                type="submit"
                                className="bg-blue-400 hover:bg-blue-600 focus:outline-none text-center text-white font-medium text-sm rounded-lg px-5 py-0.5 place-self-end"
                            >
                                { action === "Delete" ? "Delete" : "Save" }
                            </button>
                        </div>
                    }
                </form>
            </div>
        </Fragment>
    )
}

export default ModalContent