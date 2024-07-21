import React from "react";
import Image from "next/image";
import { FaTrash } from 'react-icons/fa';

type Props = {
  base64Images: string[];
};

const ImagePreview = ({ base64Images }: Props) => {
  return (
    <div className="gap-2 my-2">
      <div className="h-72 w-64 carousel carousel-vertical rounded-box">
        {base64Images.map((image, index) => {
            const src = image;

            return (
              <div className="carousel-item h-full relative aspect-video" key={index}>
                <Image src={decodeURIComponent(src)} alt={src} className="object-cover" fill onClick={() => console.log(image)} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImagePreview;