import React, { useState } from 'react'
import Sidebar from './homepage/Sidebar/Sidebar'
import './homepage.css'

export default function Homepage() {

  const [isClicked, setIsClicked] = useState(false);
  // default page is home
  const [selectedItem, setSelectedItem] = useState(0);

  // toggles the sidebar being open and closed
  const toggleMenu = () => {
    setIsClicked(!isClicked)
  }

  return (
    <div>
      <Sidebar isClicked={isClicked} toggleMenu={toggleMenu} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

      {/* There would be components present corresponding to the selected item */}
    </div >
  )
}
