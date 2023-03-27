import { signIn, signOut, useSession } from "next-auth/react";
import styles from '../styles/navbar.module.scss'
import Link from "next/link";
const { nav, logo, middleNav, navLinks, signInLink, burger, line1, line2, line3 } = styles;

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className={nav}>
      <div className={logo}>
        <Link href="/">CRC</Link>
      </div>
      <div className={middleNav}>
        <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      </div>
      <ul className={navLinks}>
        <Link href="/tithe">Tithe</Link>
        {
          sessionData?.user.role === 'ARCHITECT' && (
            <Link href="/manage">Manage</Link>
          )
        }
      </ul>
      <div className={signInLink}>
        <a 
        onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
        {sessionData ? "Sign Out" : "Sign In"}
        </a>
      </div>
      <div className={burger}>
        <div className={line1}></div>
        <div className={line2}></div>
        <div className={line3}></div>
      </div>
    </nav>
  );
}

export default  Navbar;