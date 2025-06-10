import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import { LazyAbout, LazyHome } from "./lazy-components";
import Home from "./features/Home";
import About from "./features/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: null,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
]);
