import { signIn, signOut, useSession } from "next-auth/react";
import styles from '../styles/navbar.module.scss'
import Link from "next/link";
const { nav, logo, middleNav, signInLink, burger, line1, line2, line3 } = styles;

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className={nav}>
      <div className={logo}>
        <Link href="/">Church Cal</Link>
      </div>
      <div className={middleNav}>
        <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      </div>
      {/* <ul className={navLinks}>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul> */}
      <div className={signInLink}>
        <a 
        onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
        {sessionData ? "Sign out" : "Sign in"}
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