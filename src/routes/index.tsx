import Auth from "pages/Auth";
import SignIn from "pages/Auth/SignIn";
import SignUp from "pages/Auth/SignUp";
import Books from "pages/Books";
import { Outlet, Route, Routes } from "react-router-dom";
import { cookie } from "services";

const RoutesWrapper = () => {
  const isAuthenticated = cookie.get("token") && cookie.get("secret");
  console.log(isAuthenticated);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          <Route path="/books" element={<Books />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesWrapper;
