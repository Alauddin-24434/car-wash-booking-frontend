import { useState } from "react";

import UserOne from "../../../../images/user/user-01.png";
import useCurrentUser from "../../../../utils/hooks/useCurrentUser";
import UpdateUserModal from "./UpdateUserModal";

const ProfileCard = () => {
  const {  userData } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = userData?.createdAt
    ? new Date(userData?.createdAt).toLocaleDateString("en-GB") // Formats as DD/MM/YYYY
    : "N/A";

  return (
    <div>
      <div>
        {/* <!-- Profile Card --> */}
        <div className="bg-gray-50 p-3">
          {/* Click modal */}
          <div
            className="hover:cursor-pointer hover:border p-1 h-36 w-36 mx-auto rounded-full bg-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              className="h-36 w-36 mx-auto rounded-full"
              src={userData?.image ? userData?.image : UserOne}
              alt="Profile"
            />
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {userData?.name}
          </h1>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                  Active
                </span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">{formattedDate}</span>
            </li>
          </ul>
        </div>
        {/* <!-- End of profile card --> */}
      </div>

      {/* Update User Modal */}
      <UpdateUserModal
        isOpen={isModalOpen}
  
     
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfileCard;
