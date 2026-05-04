// contains heading , slider(transver to body)

import React, { createContext, useContext, useState } from 'react'
import Body from './body'

const slide_context = createContext()

const Header = () => {
  const [b_value, set_b_value] = useState(0)

  return (
    <>

    <div className={`relative p-2 transition-all duration-500 ${
        b_value == 0
        ? "bg-black"
        : b_value == 1
        ? "bg-gray-600"
        : b_value == 2
        ? "bg-gray-400"
        :"bg-gray-200"
    }`}>
      
      <h1
        className={`text-center transition-all duration-500 ${
            b_value == 0
            ? "text-yellow-200"
            : b_value == 1
            ? "text-yellow-300"
            : b_value == 2
            ? "text-yellow-500"
            : "text-yellow-700"
        }`}
        >
        TASK MANAGEMENT SYSTEM
      </h1>

   

      <input
        type="range"
        min="0"
        max="3"
        value={b_value}
        onChange={(e) => set_b_value(e.target.value)}
        className="absolute right-2 top-2 w-24 cursor-grab active:cursor-grabbing transition-all duration-1000 ease-in-out accent-yellow-500"
        />
    </div>
<slide_context.Provider value = {[b_value , set_b_value]}>
    <Body/>
</slide_context.Provider>
        </>
  )
}

export {slide_context}
export default Header