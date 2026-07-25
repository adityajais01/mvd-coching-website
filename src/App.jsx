import { Route, Routes } from "react-router-dom"

import Coursepage from "./pages/Coursepage"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-full text-white ">
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Coursepage/>}/>
      </Routes>
    </div>
  )
}

export default App
