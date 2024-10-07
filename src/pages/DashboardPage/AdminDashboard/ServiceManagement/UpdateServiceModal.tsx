import React, { useState, useEffect } from 'react';
import { useGetServiceByIdQuery, useUpdateServiceByIdMutation } from '../../../../redux/features/service/serviceApi';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../../../firebase/Firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../../components/Shared/Loader/Loader';
import Container from '../../../../components/Shared/Container/Container';

const storage = getStorage(app);

// Define the prop types
interface UpdateServiceModalProps {
  updateToggleModel: () => void;
  serviceId: string | null; // Receive service ID for updating
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({ updateToggleModel, serviceId }) => {
  // Fetch the service data using the serviceId
  const { data, isLoading, isError } = useGetServiceByIdQuery(serviceId, {
    skip: !serviceId, // Skip the query if serviceId is null
  });

  const [updateServiceById] = useUpdateServiceByIdMutation();

  // Form state variables
  const [percent, setPercent] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>(''); // To display the existing image
  const [loading, setLoading] = useState(false); // Loading state for upload/update operations

  // Initialize form fields once data is fetched
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || '');
      setDescription(data.data.description || '');
      setDuration(data.data.duration?.toString() || '');
      setPrice(data.data.price?.toString() || '');
      setImage(data.data.image || '');
      setCurrentImage(data.data.image || '');
    }
  }, [data]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true); // Set loading true for upload

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (error) => {
        toast.error('Image upload failed!');
        setLoading(false); // Set loading false in case of error
        console.error('Upload error:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);
        setCurrentImage(downloadURL);
      
        setLoading(false); // Set loading false after success
        setPercent(0); // Reset progress
      }
    );
  };

  // Handle service update form submission
  const handleUpdateService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serviceId) {
      toast.error('Service ID is missing!');
      return;
    }

    // Validate form fields
    if (!name || !description || !duration || !price) {
      toast.error('Please fill in all the fields!');
      return;
    }

    const serviceData = {
      name,
      description,
      duration: parseFloat(duration),
      price: parseFloat(price),
      image, // This will either be the existing image or the new uploaded image
      isDeleted: false,
    };

    setLoading(true); // Set loading true for update

    try {
      await updateServiceById({ id: serviceId, data: serviceData }).unwrap();
      toast.success('Service updated successfully!');
      updateToggleModel();
    } catch (err) {
      toast.error('Failed to update service!');
      console.error('Update error:', err);
    } finally {
      setLoading(false); // Set loading false after operation completes
      
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Container>
        <div className="p-4 flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <p className="text-red-500">Error loading service data.</p>
          <button
            onClick={updateToggleModel}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Loader /> {/* Display loader when loading */}
          </div>
        )}

        <form onSubmit={handleUpdateService}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Update Service</h2>

          {/* Name Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm w-full"
            required
          />

          {/* Description Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Service Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm w-full h-24 resize-none"
            required
          ></textarea>

          {/* Duration Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            placeholder="Service Duration (e.g., 60)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm w-full"
            required
            min="0"
          />

          {/* Price Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="number"
            placeholder="Service Price (e.g., 50)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm w-full"
            required
            min="0"
            step="0.01"
          />

          {/* Current Image Display */}
          {currentImage && (
            <div className="mb-4">
              <p className="mb-2 font-semibold text-gray-700">Current Image:</p>
              <img src={currentImage} alt="Current Service" className="w-32 h-32 object-cover rounded" />
            </div>
          )}

          {/* Image Upload */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="image">Upload New Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="p-2 mb-4 bg-white border border-gray-300 rounded shadow-sm w-full"
          />
          {percent > 0 && (
            <p className="text-xs text-gray-600 mb-4">Upload Progress: {Math.round(percent)}%</p>
          )}

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={updateToggleModel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={loading}
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
