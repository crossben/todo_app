import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequireAuth from './middlewares/RequireAuth'
import Header from './shared/Header'
import Footer from './shared/footer'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import IndexPage from './pages/indexPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><IndexPage/></RequireAuth>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
