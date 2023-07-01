import { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import UsersLists from "../components/UsersLists";
import ErrorModal from "../../shared/components/UIElements/ErrorModel";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        setLoadedUsers(responseData.users); // array
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest]); //important to wrap sendRequest in useCallback

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersLists items={loadedUsers} />}
    </>
  );
};

export default Users;
