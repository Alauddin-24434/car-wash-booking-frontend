import React, { useState } from 'react';

interface CustomDropdownProps {
  options: { _id: string; name: string; image: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  hasError?: boolean; // Optional prop to indicate an error
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selectedValue, onSelect, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 bg-white border border-gray-200 rounded shadow-sm w-full text-left ${hasError ? 'border-red-500' : ''}`}
      >
        {options.find(option => option._id === selectedValue)?.name || "Select a Service"}
      </button>
      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow-lg"
          style={{ maxHeight: '200px', overflowY: 'auto' }} // Set a maximum height and enable scrolling
        >
          {options.map(option => (
            <div
              key={option._id}
              onClick={() => handleSelect(option._id)}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
            >
              <img src={option.image} alt={option.name} className="w-8 h-8 mr-2 rounded-full" />
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
