import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
  <header>
    <Link to ="/"> Günlük tahmin </Link>
    <Link to ="/Weekly"> Haftalık tahmin</Link>
     <Link to ="/Monthly"> Aylık tahmin</Link>
   
  </header>
  )
}

export default Header