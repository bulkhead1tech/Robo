import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.jsx'
import './index.css'
import App from './App.jsx'
import Filter from '../components/filter.jsx'
import {
  createBrowserRouter,
  RouterProvider,

} 
from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "filter",
        element: <Filter />,
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
