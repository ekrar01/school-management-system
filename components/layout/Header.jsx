import styles from '../../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>School Manager</h1>
          <nav className={styles.nav}>
            <a href="/schools" className={styles.navLink}>View Schools</a>
            <a href="/add-school" className={styles.navLink}>Add School</a>
          </nav>
        </div>
      </div>
    </header>
  );
}