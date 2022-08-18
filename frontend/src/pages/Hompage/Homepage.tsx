import React, { useState } from 'react'
import Sidebar from '../Homepage_Components/Sidebar'
import './homepage.css'

export default function Homepage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // toggles the sidebar being open and closed
  const toggleMenu = () => {
    setIsClicked(!isMenuOpen)
  }

  return (
    <div>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* There would be components present for homepage */}
    </div >
  )
}
