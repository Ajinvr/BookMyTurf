import React from 'react'
import logo from '../../../assets/logo.png';

function Footer() {
  return (
    <footer style={{fontFamily:"sub"}} className="footer bg-primary text-base-content p-10 mt-20">
    <aside>
      <img className='w-80' src={logo} alt="" />
    </aside>
    <nav>
      <h6 className="text-accent">Faq</h6>
      <a className="link link-hover">become a partner</a>
      <a className="link link-hover">payment options </a>
      <a className="link link-hover">canellation</a>
      <a className="link link-hover">refund</a>
    </nav>
    <nav>
      <h6 className="text-accent">Contact</h6>
      <a className="link link-hover"> Ph: 1234567890</a>
      <a className="link link-hover">Email : example.gmail.com</a>
    </nav>
  </footer>
  )
}

export default Footer