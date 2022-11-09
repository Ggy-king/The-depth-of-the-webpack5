import React, { Suspense, lazy } from 'react'
import { Link, Routes, Route } from "react-router-dom"

// import Home from './page/Home'
// import About from './page/About'

// 实现懒加载技术  /* */ 中可以进行模仿命名 打包后有相应的名字
const Home = lazy(() => import(/* webpackChunkName: 'home'*/ "./page/Home"))
const About = lazy(() => import(/* webpackChunkName: 'about'*/ "./page/About"))

export default function App() {
  return (
    <div>
      <h1>APP</h1>

      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>

    </div>
  )
}
