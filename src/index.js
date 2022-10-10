import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  redirect,
  RouterProvider
} from 'react-router-dom';
import './css/index.css';
import Onboarding from "./Onboarding";
import Login from "./components/Onboarding/login";
import Welcome from "./components/Onboarding/welcome";
import NewAccount from './components/Onboarding/new';
import PlanetList from "./components/Onboarding/planetList"
import PayDetailScreen from './components/Onboarding/detail';
import PayScreen from "./components/Onboarding/pay";
import ConfirmScreen from "./components/Onboarding/confirm";
import Debug from "./components/Onboarding/debug";
import Sigil from "./components/sigil";
import 'tippy.js/dist/tippy.css';

const App = React.lazy(() => import('./App'));

const authLoader = () => {
  const stored = window.localStorage.getItem("tirrel-desktop-auth");
  if (!!stored) {
    return JSON.parse(stored);
  }
  return {
    ship: process.env.REACT_APP_SHIP,
    code: process.env.REACT_APP_CODE,
    url: process.env.REACT_APP_URL
  };
};

const router = createHashRouter([
  {
    path: "/",
    element: <Onboarding />,
    loader: authLoader,
    children: [
      {
        path: "",
        element: <Welcome />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "new",
        element: <NewAccount />,
        children: [
          {
            path: "",
            element: <PlanetList />
          },
          {
            path: "detail",
            element: <PayDetailScreen />
          },
          {
            path: "pay",
            element: <PayScreen />
          },
          {
            path: "confirm",
            element: <ConfirmScreen />
          }
        ]
      },
      {
        path: 'debug',
        element: <Debug />
      }
    ]
  },
  {
    path: '/app',
    element: (
      <React.Suspense fallback={
        <div className="w-100 h-100 flex justify-center items-center">
          <div className="spinner">
            <Sigil patp="~tirrel" color="#3045B1" />
          </div>
        </div>
        }>
        <App />
      </React.Suspense>
    ),
    loader: authLoader
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
