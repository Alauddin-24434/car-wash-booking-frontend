import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserByIdQuery } from "../../redux/features/auth/authApi";

const useCurrentUser = () => {
  // Get the current user from Redux state
  const user = useAppSelector(selectCurrentUser);

  // Fetch additional data related to the user, if necessary
  const { data: userData, isLoading: userIsLoading } = useGetUserByIdQuery(
    user?.userId,
    {
      skip: !user?.userId,
    }
  );

  return {
 
    userData: userData?.data, // Corrected here to return userData.data directly
    userIsLoading,
  };
};

export default useCurrentUser;
