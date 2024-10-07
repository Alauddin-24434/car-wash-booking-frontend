
import Container from "../../../../components/Shared/Container/Container";
import Loader from "../../../../components/Shared/Loader/Loader";
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const { data: fetchUsers, error, isLoading } = useGetAllUsersQuery(undefined);
 
  const [updateUserRole] = useUpdateUserRoleMutation(); // Use the mutation hook

  const handleToggleRole = async (user: User) => {
    const updatedRole = user.role === "admin" ? "user" : "admin";
    const userId= user._id;
    console.log(userId)
    try {
      await updateUserRole({userId, newRole: updatedRole }).unwrap();
      
      console.log(`Role updated for user: ${user.name} to ${updatedRole}`);
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };


  if (isLoading) {
    return (
      <Container>
        <div className="p-4 flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="p-4 py-12">
          <p className="text-center text-red-500">
            An error occurred while fetching service details.
          </p>
        </div>
      </Container>
    );
  }
  return (
    <div className=" min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              {["User Name", "Email", "Role", "Toggle Role"].map((heading) => (
                <th key={heading} className="p-4 border-b border-blue-200">
                  <p className="text-sm font-medium">{heading}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {fetchUsers?.data?.map((user: User, index: number) => (
              <tr
                key={user._id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.name}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.email}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{user.role}</p>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleRole(user)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      user.role === "admin"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Set as {user.role === "admin" ? "User" : "Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
