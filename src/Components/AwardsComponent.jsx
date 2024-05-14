import React from 'react';
// import "./AwardsComponents.css"
import { useImageContext } from './context/contextprovider';

const AwardsComponent = ({award}) => {
  const { uploadedImage } = useImageContext();
  const localImageData = localStorage.getItem('uploadedImage');

  if (uploadedImage || localImageData) {
    let imageUrl;
    if (uploadedImage) {
      // Convert the Blob object to a Base64 string and store it in local storage
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        localStorage.setItem('uploadedImage', base64String);
      };
      reader.readAsDataURL(uploadedImage);

      // Use the Blob URL directly for the current session
      imageUrl = URL.createObjectURL(uploadedImage);
    } else {
      // Use the Base64 string retrieved from local storage
      imageUrl = `data:image/jpeg;base64,${localImageData}`; // Fix syntax here
    }

    return (
      <div>
        <h2 className="w-[90%] h-24 rounded-full mt-10 flex justify-center items-center bg-gradient-to-r from-black via-gray-700 to-black drop-shadow-lg text-center italic text-4xl font-semibold tracking-tight font-serif text-gray-100">AwardsComponent</h2>
        <div className="flex justify-center items-center">
          <div className="project p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={imageUrl} alt="Uploaded Award" className="h-48 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">{award}</h3>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AwardsComponent;
