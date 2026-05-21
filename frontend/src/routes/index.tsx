export const routes = [
  {
    path: "/",
    element: () => import("../pages/Home").then((m) => m.HomePage),
    label: "Home",
  },
  {
    path: "/login",
    element: () => import("../pages/Auth/Login").then((m) => m.LoginPage),
    label: "Login",
  },
  {
    path: "/register",
    element: () => import("../pages/Auth/Register").then((m) => m.RegisterPage),
    label: "Register",
  },
];
