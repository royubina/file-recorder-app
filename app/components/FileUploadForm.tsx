"use client"; 

import React, { useState, useEffect } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";

type Props = {
  itemImages: File[];
  action: String
};

const FileUploadForm = ({ itemImages, action }: Props) => {
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);

      let fileArray = []
      let resultOne: any

      _files.map(async (file) => {
        resultOne = await toBase64(file)

        fileArray.push(resultOne)

        setBase64Images(fileArray)
      })
    }
  };

  useEffect(() => {
    if(itemImages !== undefined) {
      let resultImage: any[] = [] 

      itemImages.map((image: any) => {
        resultImage.push(`data:image/jpeg;base64,${image}`)
      })
      
      setBase64Images(resultImage);
    }
  }, [itemImages])

  return (
    // <form className="w-full">
    <div>
      <CustomFileSelector
        accept="image/png, image/jpeg"
        onChange={handleFileSelected}
        disabled={action==="View" || action==="Delete"}
      />
      <ImagePreview base64Images={base64Images} />
    </div>
    // </form>
  );
};

export default FileUploadForm;