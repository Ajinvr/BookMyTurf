import React from 'react'
import logo from '../../assets/logo.png';

function Footer() {
  return (
    <footer className="footer bg-primary text-white p-10 ">
    <aside>
      <img className='w-80' src={logo} alt="" />
    </aside>
    <nav>
      <h6>Faq</h6>
      <a className="link link-hover">become a partner</a>
      <a className="link link-hover">payment options </a>
      <a className="link link-hover">canellation</a>
      <a className="link link-hover">refund</a>
    </nav>
    <nav>
      <h6>Contact</h6>
      <a className="link link-hover"> Ph: 1234567890</a>
      <a className="link link-hover">Email : example.gmail.com</a>
    </nav>
  </footer>
  )
}

export default Footer