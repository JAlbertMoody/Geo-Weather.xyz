import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/HomePageComponents/Home';
import AppPage from './pages/AppPageComponents/AppPage';
import Favorites from './pages/Favorites';
import Maps from './pages/Maps'
import About from './pages/About'
import Settings from './pages/Settings'

export default function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="app" element={<AppPage />}/>
          <Route path="favorites" element={<Favorites />}/>
          <Route path="maps" element={<Maps />}/>
          <Route path="about" element={<About />}/>
          <Route path="settings" element={<Settings />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
