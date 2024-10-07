import React, { useState } from "react";
import { useAddServiceMutation } from "../../../../redux/features/service/serviceApi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../../firebase/Firebase.config";
import toast, { Toaster } from "react-hot-toast";

import Loader from "../../../../components/Shared/Loader/Loader";

const storage = getStorage(app);

// Define the prop types
interface AddServiceModalProps {
  addToggleModel: () => void; // toggleModel is a function that returns void
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  addToggleModel,
}) => {
  const [addService] = useAddServiceMutation();
  const [percent, setPercent] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(""); // Duration will now be a string to accommodate the select options
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state for upload/update operations
  console.log(percent);
  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true); // Set loading true for upload

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (error) => {
        toast.error("Image upload failed!");
        setLoading(false); // Set loading false in case of error
        console.error("Upload error:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);
        setLoading(false); // Set loading false after success
        setPercent(0); // Reset progress
      }
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if image is uploaded
    if (!image) {
      console.error("Image is required");
      toast.error("Image is required");
      return;
    }

    // Create the service object
    const service = {
      name,
      description,
      duration: parseFloat(duration), // Ensure that duration is parsed to a number
      price: parseFloat(price),
      image, // Include image URL
      isDeleted: false, // Include isDeleted field
    };

    try {
      // Trigger the mutation
      await addService(service).unwrap();
      toast.success("Service add successfully");
      addToggleModel(); // Close the modal on success
    } catch (error) {
      // Log the error if the mutation fails
      console.error("Failed to save service:", error);
      toast.error("Failed to save service");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col w-10/12 sm:w-4/6 lg:w-1/3 max-w-md mx-auto rounded-lg border border-gray-300 shadow-xl bg-white">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Loader /> {/* Display loader when loading */}
          </div>
        )}
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg">
          <p className="font-semibold text-gray-800">Add a Service</p>
          <button onClick={addToggleModel} aria-label="Close modal">
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-4 py-4 bg-gray-50"
        >
          {/* Name Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          />

          {/* Description Field */}
          <label
            className="mb-2 font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Type service description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm h-28 resize-none"
          ></textarea>

          {/* Duration Field */}
          <label
            className="mb-2 font-semibold text-gray-700"
            htmlFor="duration"
          >
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          >
            <option value="">Select Duration</option>
            {/* <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option> */}
            <option value="60">60 Minutes</option>
            {/* <option value="90">90 Minutes</option> */}
          </select>

          {/* Price Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Enter Price number (e.g., 50)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-200 rounded shadow-sm"
          />

          {/* Image Upload Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mb-4"
          />

          <hr />
          <div className="flex justify-end gap-4 p-2">
            <button
              type="button"
              onClick={addToggleModel}
              className="text-gray-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-white border-t border-gray-200 rounded-b-lg">
          {/* Footer content here if needed */}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddServiceModal;
