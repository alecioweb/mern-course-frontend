import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

//loaded when component is required. (only works with routes)
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />}></Route>
        <Route path="/:userId/places" element={<UserPlaces />}></Route>
        <Route path="/places/new" element={<NewPlace />}></Route>
        <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Redirect to="/" /> */}
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />}></Route>
        <Route path="/:userId/places" element={<UserPlaces />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<Navigate to="/auth" />} />

        {/* <Redirect to="/auth" /> */}
      </>
    );
  }

  return (
    //binding initial value to new value
    //only components that listen to context will re-render
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div>
        <MainNavigation />
        <main>
          {/* <Route path="/" element={<Users />}></Route>
            <Route path="/:userId/places" element={<UserPlaces />}></Route>
            <Route path="/places/new" element={<NewPlace />}></Route>
            <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
            <Route path="/auth" element={<Auth />}></Route> */}

          {/* (fallback)if downloading lazy takes longer */}
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
