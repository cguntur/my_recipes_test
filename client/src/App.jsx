import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '../public/vite.svg'
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <main className="mx-3">
        <Header />
        <div className="main_content">
            <Outlet />
        </div>
      </main>
      <Footer /> 
    </>
  )
}

export default App
