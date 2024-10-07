import React, { useState, useEffect } from 'react';
import { useUpdateUserThroughUserMutation } from '../../../../redux/features/auth/authApi';
import useCurrentUser from '../../../../utils/hooks/useCurrentUser';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose }) => {
  const { userId, userData } = useCurrentUser();
  
  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [address, setAddress] = useState(userData?.address || '');

  const [updateUserThroughUser, {  error, isLoading, isSuccess }] = useUpdateUserThroughUserMutation();

  // Reset fields when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName(userData.name || '');
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
    }
  }, [isOpen, userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userInfo = {
      name,
      email: userData.email, // Email is fixed, as it's not being updated here
      address,
      phone,
      image: userData?.image, // If image should not be changed
      isDeleted: userData?.isDeleted,
      role: userData?.role,
    };

    try {
      await updateUserThroughUser({ userId, userInfo });
    } catch (err) {
      console.error('Update failed:', error); // Handle error if needed
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

        {/* Handle success and error messages */}
        {isSuccess && <p className="text-green-500 mb-4">Profile updated successfully!</p>}
        {/* {isError && <p className="text-red-500 mb-4">Error: {error?.data?.message || 'Update failed'}</p>} */}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md text-sm text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-sm text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
