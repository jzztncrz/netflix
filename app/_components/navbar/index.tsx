'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import NavMenu from './menu'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`px-4 lg:px-10 grid grid-cols-[auto,1fr,auto] gap-4 lg:gap-6 items-center sticky top-0 z-[999] ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="w-32 h-24 relative -ml-3 lg:-ml-0">
        <Image src="/logo/netflix.png" alt="Netflix" fill sizes="w-auto h-auto" className="object-center" />
      </div>
      <NavMenu />
    </nav>
  )
}

export default Navbar
