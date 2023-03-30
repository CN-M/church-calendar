import { signIn, signOut, useSession } from "next-auth/react";
import styles from '../styles/navbar.module.scss'
import Link from "next/link";
import Image from "next/image";
import AnishaProfilePicture from "../assets/avatar-anisha.png"
import { useState } from "react";
const { nav, mobileMenu, hiddenMenu, activeDrawer, logo, middleNav, navLinks, signInLink, burger, hamburgerTop, hamburgerMiddle, hamburgerBottom, userDetails, open } = styles;

const Navbar = () => {
  const { data: sessionData } = useSession();

  const [active, setActive] = useState(false)
  const [activeDrawerState, setActiveDrawerState] = useState(false)

  const handleBurger = () => {
    setActive(current => !current)
    setActiveDrawerState(current => !current)
  }

  return (
    <nav className={nav}>
      <div className={logo}>
        <Link href="/">CRC</Link>
      </div>
      <div className={middleNav}>
        <ul className={navLinks}>
          <Link href="/tithe">Tithe</Link>
          { sessionData?.user.role === 'ARCHITECT' && ( <Link href="/manage">Manage</Link> ) }
        </ul>
      </div>
      <div className={`${activeDrawerState ? activeDrawer : ''}`}>
        <div className={hiddenMenu}>
          <div className={`${mobileMenu}`}>
              <Link href="/tithe">Tithe</Link>
              { sessionData?.user.role === 'ARCHITECT' && ( <Link href="/manage">Manage</Link> ) }
          </div>
        </div>
      </div>
      <div className={signInLink}>
        <div className={userDetails}>
            {
              ( sessionData && sessionData?.user.image ) && (
                <Image 
                  src={sessionData?.user.image || AnishaProfilePicture } 
                  alt={`${sessionData?.user.name} Profile Pciture`} 
                  width={30}
                  height={30}
                  />
              )
            }
          <a 
          onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
          {sessionData ? "Sign Out" : "Sign In"}
          </a>
        </div>
      </div>
      {/* <div className={`${mobileMenu} ${active ? activeDrawer : ''}`}> */}
      {/* <div className={`${mobileMenu} ${true ? activeDrawer : ''}`}> */}
      
      <div className={`${burger} ${active ? open : ''}`} onClick={handleBurger}>
        <span className={hamburgerTop}></span>
        <span className={hamburgerMiddle}></span>
        <span className={hamburgerBottom}></span>
      </div>
    </nav>
  );
}

export default  Navbar;