import React, { useEffect, useState } from 'react'
import Header from '../components/header.jsx'
import { Outlet } from 'react-router-dom'


function Layout() {
  
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Layout