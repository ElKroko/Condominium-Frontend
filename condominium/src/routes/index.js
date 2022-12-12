import React from "react";

import async from "../components/Async";

import { List, Monitor, Users } from "react-feather";

import { Pool } from "@material-ui/icons";
import { EventNote } from "@material-ui/icons";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// My Components!!!
const ResidenteDashboard = async(() =>
  import("../pages/condominium/Residente")
);
const GastosComunesTable = async(() =>
  import("../pages/condominium/GastosComunes/GastosComunesTable")
);

const EspaciosMain = async(() =>
  import("../pages/condominium/Espacios/EspaciosMain")
);
const EventosTable = async(() =>
  import("../pages/condominium/Eventos/EventosTable")
);

// Protected routes
const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
};

const ResidenteRoutes = {
  id: "Inicio",
  path: "/",
  icon: <Monitor />,
  containsHome: true,
  children: null,
  component: ResidenteDashboard,
};

const GastosComunesRoutes = {
  id: "Gastos",
  path: "/gastos",
  icon: <List />,
  containsHome: true,
  children: null,
  component: GastosComunesTable,
};

const EspaciosRoutes = {
  id: "Espacios",
  path: "/espacios",
  icon: <Pool />,
  containsHome: true,
  children: null,
  component: EspaciosMain,
};

const EventosRoutes = {
  id: "Eventos",
  path: "/eventos",
  icon: <EventNote />,
  containsHome: true,
  children: null,
  component: EventosTable,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  ResidenteRoutes,
  GastosComunesRoutes,
  EspaciosRoutes,
  EventosRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [ResidenteRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar

export const sidebarRoutes = [
  ResidenteRoutes,
  GastosComunesRoutes,
  EspaciosRoutes,
  EventosRoutes,
];
