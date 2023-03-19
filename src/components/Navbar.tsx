import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <a href="#">Logo</a>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
      <div className={styles.signIn}>
        <a href="#">Sign In</a>
      </div>
      <div className={styles.burger}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
    </nav>
  );
}

export default  Navbar;