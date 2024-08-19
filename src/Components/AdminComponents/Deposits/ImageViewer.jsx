import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../api/getApiURL';


const ImageViewer = ({ isOpen, onClose, details,title }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white text-black">
        <button onClick={onClose} className="absolute top-2 right-2 bg-gray-900 hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold leading-tight tracking-wide">Deposit Document</h2>
        
        <div className='mb-4 h-full'>
         
        <img 
          src={`${API_BASE_URL}/${details.documents}`} 
          alt="doc" 
          style={{ maxHeight: '70vh', width: 'auto' }} 
        />

        
        </div>

      </div>
    </div>
  );
};

export default ImageViewer;
