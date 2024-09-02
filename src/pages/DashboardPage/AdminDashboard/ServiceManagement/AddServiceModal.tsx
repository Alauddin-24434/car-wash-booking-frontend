import React, { useState } from 'react';
import { useAddServiceMutation } from '../../../../redux/features/service/serviceApi';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../../../firebase/Firebase.config';
import { toast } from 'react-toastify';

const storage = getStorage(app);

// Define the prop types
interface AddServiceModalProps {
  toggleModel: () => void; // toggleModel is a function that returns void
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ toggleModel }) => {
  const [addService] = useAddServiceMutation();
  const [percent, setPercent] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string>('');
  
  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
  
    if (!files || files.length === 0) {
      console.error('No file selected for upload');
      toast.error('No file selected for upload');
      return;
    }
  
    const file = files[0]; // Get the first file
    const storagePath = `images/${file.name}`;
    const storageRef = ref(storage, storagePath);
  
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
        console.log(`Upload is ${progress}% done`);
      });
  
      await uploadTask;
  
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL); // Update state with the single image URL
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if image is uploaded
    if (!image) {
      console.error('Image is required');
      toast.error('Image is required');
      return;
    }
  
    // Create the service object
    const service = {
      name,
      description,
      duration: parseFloat(duration),
      price: parseFloat(price),
      image, // Include image URL
      isDeleted: false, // Include isDeleted field
    };
  
    try {
      // Trigger the mutation
      await addService(service).unwrap();
      toggleModel(); // Close the modal on success
    } catch (error) {
      // Log the error if the mutation fails
      console.error('Failed to save service:', error);
      toast.error('Failed to save service');
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col w-10/12 sm:w-4/6 lg:w-1/3 max-w-md mx-auto rounded-lg border border-gray-300 shadow-xl bg-white">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg">
          <p className="font-semibold text-gray-800">Add a Service {percent}</p>
          <button onClick={toggleModel} aria-label="Close modal">
            <svg
              className="w-5 h-5 text-gray-600 hover:text-gray-900 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col px-4 py-4 bg-gray-50">
          {/* Name Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          />

          {/* Description Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Type service description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm h-28 resize-none"
          ></textarea>

          {/* Duration Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="duration">Duration</label>
          <input
            id="duration"
            type="number"
            placeholder="Enter Service Duration number (e.g., 60)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          />

          {/* Price Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Enter Price number (e.g., 50)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          />

          {/* Image Upload Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mb-4"
          />

          <hr />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={toggleModel} className="text-gray-600 font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition">
              Save
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-white border-t border-gray-200 rounded-b-lg">
          {/* Footer content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
