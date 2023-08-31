import App from "../layout/App";
import Landing from "../layout/Landing";
import RequiredAuth from "./RequiredAuth";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { createBrowserRouter, Navigate } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequiredAuth />,
        children: [{}],
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "skill",
        element: <Landing />,
      },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
